# Parse go coverage profile, output uncovered line ranges per file.
# Usage: go test -coverprofile=cover.out ./...; awk -f cover-uncovered.awk cover.out
/^mode:/ { next }
{
    split($1, a, ":")
    file = a[1]; sub(/.*\//, "", file)
    split(a[2], pos, ",")
    split(pos[1], sl, ".")
    split(pos[2], el, ".")
    startL = sl[1]+0; endL = el[1]+0
    count = $3+0
    if (count > 0) next
    for (l = startL; l <= endL; l++) {
        key = file SUBSEP l
        uncov[key] = 1
        if (!(file in files)) { files[file] = 1; maxl[file] = 0 }
        if (l > maxl[file]) maxl[file] = l
    }
}
END {
    for (f in files) {
        n = 0
        for (l = 1; l <= maxl[f]; l++) {
            if ((f SUBSEP l) in uncov) lines[++n] = l
        }
        if (n == 0) continue
        out = ""; start = lines[1]; prev = lines[1]
        for (i = 2; i <= n; i++) {
            if (lines[i] == prev+1) { prev = lines[i]; continue }
            out = out (out?",":"") (start==prev ? start : start"-"prev)
            start = prev = lines[i]
        }
        out = out (out?",":"") (start==prev ? start : start"-"prev)
        printf "%s: %s\n", f, out
    }
}
