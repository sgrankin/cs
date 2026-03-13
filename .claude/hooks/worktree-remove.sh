#!/usr/bin/env bash
set -euo pipefail

# WorktreeRemove hook: cleans up jj workspaces or git worktrees.
# Input: JSON on stdin with {worktree_path, cwd, session_id, hook_event_name}

LOGFILE="${TMPDIR:-/tmp}/claude-worktree-remove.log"
INPUT=$(cat)
echo "$(date): input=$INPUT" >> "$LOGFILE"
DIR=$(jq -r '.worktree_path // empty' <<< "$INPUT")
CWD=$(jq -r .cwd <<< "$INPUT")
if [ -z "$DIR" ]; then
  # Fallback: try name field
  NAME=$(jq -r .name <<< "$INPUT")
  DIR="$CWD/.claude/worktrees/$NAME"
else
  NAME=$(basename "$DIR")
fi

cd "$CWD"

if [ -d .jj ]; then
  jj workspace forget "wt-$NAME" >> "$LOGFILE" 2>&1 || echo "$(date): jj workspace forget failed: $?" >> "$LOGFILE"
else
  git worktree remove "$DIR" --force >> "$LOGFILE" 2>&1 || echo "$(date): git worktree remove failed: $?" >> "$LOGFILE"
  git branch -D "claude/wt-$NAME" >> "$LOGFILE" 2>&1 || true
fi

rm -rf "$DIR" >> "$LOGFILE" 2>&1 || echo "$(date): rm failed: $?" >> "$LOGFILE"
