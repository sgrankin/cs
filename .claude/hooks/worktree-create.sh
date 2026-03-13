#!/usr/bin/env bash
set -euo pipefail

# WorktreeCreate hook: uses jj workspaces in jj repos, git worktrees otherwise.
# Input: JSON on stdin with {name, cwd, session_id, hook_event_name}
# Output: absolute path to created worktree on stdout

INPUT=$(cat)
NAME=$(jq -r .name <<< "$INPUT")
CWD=$(jq -r .cwd <<< "$INPUT")
DIR="$CWD/.claude/worktrees/$NAME"

mkdir -p "$(dirname "$DIR")"
cd "$CWD"

if [ -d .jj ]; then
  jj workspace add "$DIR" --name "wt-$NAME" >&2
else
  git worktree add -b "claude/wt-$NAME" "$DIR" HEAD >&2
fi

echo "$DIR"
