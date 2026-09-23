#!/usr/bin/env bash
# The desktop wallpaper shown on the lab's screens. Needs cwebp.
set -euo pipefail

SRC="${1:-$HOME/Downloads/Telegram Lite/hoakaos-wallpaper}"
OUT="$(dirname "$0")/../public/media"
mkdir -p "$OUT"

tmp="$(mktemp -d)"
sips --resampleWidth 800 "$SRC/3.png" --out "$tmp/wall-3.png" >/dev/null
cwebp -quiet -q 76 -m 6 "$tmp/wall-3.png" -o "$OUT/wall-3-800.webp"
rm -rf "$tmp"

echo "written to $OUT"
