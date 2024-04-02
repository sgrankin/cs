package cs

import (
	"fmt"
	"log"
	"os"
	"path/filepath"
	"time"

	"sgrankin.dev/cs/codesearch/index"
)

type Version = string

type searchIndex struct {
	*indexSearcher

	indexBuilder *indexBuilder
	repoSyncer   *repoSyncer

	name string
	done chan bool
}

func NewSearchIndex(cfg IndexConfig, pollInterval time.Duration, githubToken string) *searchIndex {
	if cfg.Name == "" {
		cfg.Name = filepath.Base(cfg.Path)
	}
	if err := os.MkdirAll(cfg.Path, 0o777); err != nil {
		log.Panicf("creating %q: %v", cfg.Path, err)
	}

	indexName := filepath.Join(cfg.Path, "csindex")
	if _, err := os.Stat(indexName); err != nil {
		// Create an empty index as a placeholder.
		index.Create(indexName).Flush()
	}
	ix := index.Open(indexName)

	gitPath := filepath.Join(cfg.Path, "git")
	// Open the repo to make sure it's valid... but then don't use it.
	// Background changes (e.g. from maintenance) may cause go-git repos to become non-functional,
	// so we reopen the repo every time we index.
	_, err := openGitRepo(gitPath)
	if err != nil {
		log.Panicf("could not open git repo: %v", err)
	}

	searcher := newIndexSearcher(ix)
	builder := newIndexBuilder()
	syncer := newRepoSyncer(gitPath, githubToken, cfg.Repos, cfg.RepoSources)

	done := make(chan bool, 1)
	si := &searchIndex{searcher, builder, syncer, cfg.Name, done}

	if pollInterval > 0 {
		go si.refreshLoop(pollInterval)
	} else {
		go si.watchLoop()
	}
	return si
}

func (si *searchIndex) refreshLoop(pollInterval time.Duration) {
	ticker := time.NewTicker(pollInterval)
	defer ticker.Stop()
	si.refresh()
	for {
		select {
		case <-si.done:
			return
		case <-ticker.C:
			si.refresh()
		}
	}
}

func (si *searchIndex) watchLoop() {
	path := si.ix.Path

	ticker := time.NewTicker(5 * time.Second)
	defer ticker.Stop()
	for range ticker.C {
		stat, err := os.Stat(path)
		if err != nil {
			log.Printf("Error checking %q: %v", path, err)
			continue
		}
		if stat.ModTime().Equal(si.ix.FileInfo.ModTime()) {
			continue
		}
		log.Printf("Reloading index %q", path)
		if ix := index.Open(path); ix != nil {
			ix = si.swapIndex(ix)
			ix.Close()
		}
	}
}

func (si *searchIndex) refresh() {
	log.Printf("Refreshing local repositories for %q", si.name)
	repos, err := si.repoSyncer.Refresh()
	if err != nil {
		log.Printf("Repo sync failed: %v", err)
		return
	}
	log.Printf("Maybe rebuilding index for %q", si.name)
	if ix := si.indexBuilder.rebuildIfNeeded(si.indexSearcher.ix, repos); ix != nil {
		log.Printf("Updating index %q", si.name)
		ix = si.indexSearcher.swapIndex(ix)
		if err := ix.Close(); err != nil {
			log.Printf("Error closing old index: %v", err)
		}
	}
}

func (si *searchIndex) Name() string { return si.name }
func (si *searchIndex) Close()       { si.done <- true }

func BuildSearchIndex(cfg IndexConfig, githubToken string) error {
	if cfg.Name == "" {
		cfg.Name = filepath.Base(cfg.Path)
	}
	if err := os.MkdirAll(cfg.Path, 0o777); err != nil {
		log.Panicf("creating %q: %v", cfg.Path, err)
	}

	indexName := filepath.Join(cfg.Path, "csindex")
	if _, err := os.Stat(indexName); err != nil {
		// Create an empty index as a placeholder.
		index.Create(indexName).Flush()
	}
	ix := index.Open(indexName)
	defer ix.Close()

	gitPath := filepath.Join(cfg.Path, "git")
	repoSyncer := newRepoSyncer(gitPath, githubToken, cfg.Repos, cfg.RepoSources)
	repos, err := repoSyncer.Refresh()
	if err != nil {
		log.Printf("Repo sync failed: %v", err)
		return nil
	}
	indexBuilder := newIndexBuilder()
	ix = indexBuilder.rebuildIfNeeded(ix, repos)
	if ix == nil {
		return fmt.Errorf("error updating index")
	}
	return nil
}
