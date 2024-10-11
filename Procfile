templ: templ generate -watch
build: cd livegrep/server && go run ./build -watch -debug
serve: fd -ego -ejs -ecss -etxt | watchexec -r go run ./cmd/csweb
