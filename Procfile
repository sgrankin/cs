templ: templ generate -watch -v
build: cd livegrep/server && go run ./build -watch
serve: fd -ego -ejs -ecss -etxt | watchexec -r go run ./cmd/csweb
