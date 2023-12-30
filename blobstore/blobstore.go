package blobstore

import (
	"context"
	"net/url"
	"runtime"

	"zombiezen.com/go/sqlite"
	"zombiezen.com/go/sqlite/sqlitemigration"
	"zombiezen.com/go/sqlite/sqlitex"
)

var schema = sqlitemigration.Schema{
	Migrations: []string{
		`CREATE TABLE blobs (
			key BLOB NOT NULL PRIMARY KEY,
			data BLOB NOT NULL);`,
	},
}

type BlobStore struct {
	pool *sqlitex.Pool
}

func Open(path string) (*BlobStore, error) {
	v := url.Values{}
	v.Add("_pragma", "journal_mode(off)") // wal
	v.Add("_pragma", "synchronous(off)")  // normal 1
	v.Add("_pragma", "foreign_keys(on)")
	v.Add("_pragma", "mmap_size(64000000000)")
	v.Add("_time_format", "sqlite")
	u := url.URL{
		Scheme:   "file",
		Opaque:   path,
		RawQuery: v.Encode(),
	}
	pool, err := sqlitex.Open(u.String(), sqlite.OpenReadWrite|sqlite.OpenCreate|sqlite.OpenURI, runtime.NumCPU())
	if err != nil {
		return nil, err
	}
	ctx := context.Background()
	conn := pool.Get(ctx)
	err = sqlitemigration.Migrate(ctx, conn, schema)
	pool.Put(conn)
	if err != nil {
		pool.Close()
		return nil, err
	}
	return &BlobStore{pool}, nil
}

func (b *BlobStore) Close() error {
	return b.pool.Close()
}

type pooledBlob struct {
	*sqlite.Blob
	conn *sqlite.Conn
	pool *sqlitex.Pool
}

func (b *pooledBlob) Close() {
	b.Blob.Close()
	b.pool.Put(b.conn)
}

func (b *BlobStore) Create(key []byte, size int) (*pooledBlob, error) {
	conn := b.pool.Get(context.Background())
	q := `INSERT OR REPLACE INTO blobs (key, data) VALUES (?, zeroblob(?))`
	if err := sqlitex.Execute(conn, q, &sqlitex.ExecOptions{Args: []any{key, size}}); err != nil {
		return nil, err
	}
	blob, err := conn.OpenBlob("", "blobs", "data", conn.LastInsertRowID(), true)
	if err != nil {
		return nil, err
	}
	return &pooledBlob{blob, conn, b.pool}, nil
}

func (b *BlobStore) Open(key []byte) (*pooledBlob, error) {
	conn := b.pool.Get(context.Background())
	stmt := conn.Prep(`SELECT rowid FROM blobs WHERE key = ?`)
	stmt.BindBytes(1, key)
	rowid, err := sqlitex.ResultInt64(stmt)
	if err != nil { // No blob.
		b.pool.Put(conn)
		return nil, err
	}
	blob, err := conn.OpenBlob("", "blobs", "data", rowid, false)
	if err != nil {
		return nil, err
	}
	return &pooledBlob{blob, conn, b.pool}, nil
}

func (b *BlobStore) Truncate(key []byte, size int) error {
	conn := b.pool.Get(context.Background())
	defer b.pool.Put(conn)
	q := `UPDATE blobs SET data = coalesce(substring(data, 1, $size), zeroblob(0)) WHERE key=$key`
	return sqlitex.Execute(conn, q, &sqlitex.ExecOptions{
		Named: map[string]any{"$size": size, "$key": key},
	})
}
