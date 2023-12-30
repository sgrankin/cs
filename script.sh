git init --bare data
cd data
git fetch --depth=1 -v https://github.com/torvalds/linux.git +HEAD:torvalds/linux/HEAD
