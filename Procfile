#templ: templ generate -watch
build: cd livegrep/server && go run ./build -watch -debug
#serve: fd -ego -ejs -ecss -etxt | watchexec -r go run ./cmd/csweb
templ2: templ generate -watch-pattern="(.+\\.(go|templ|css|js|txt)$)" -watch -proxy="http://localhost:8910" --cmd="go run ./cmd/csweb"
