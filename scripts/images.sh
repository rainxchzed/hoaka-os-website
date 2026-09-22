#!/usr/bin/env bash
# Regenerates public/media from the source wallpapers. Needs cwebp and avifenc.
set -euo pipefail

SRC="${1:-$HOME/Downloads/Telegram Lite/hoakaos-wallpaper}"
OUT="$(dirname "$0")/../public/media"
mkdir -p "$OUT"

for n in 1 2 3 4; do
  for w in 1600 800; do
    tmp="/tmp/hoaka-wall-$n-$w.png"
    sips --resampleWidth "$w" "$SRC/$n.png" --out "$tmp" >/dev/null
    cwebp -quiet -q 76 -m 6 "$tmp" -o "$OUT/wall-$n-$w.webp"
    avifenc --min 24 --max 34 -s 6 -j all "$tmp" "$OUT/wall-$n-$w.avif" >/dev/null
    rm -f "$tmp"
  done
done

# Static hero poster for machines that do not get the WebGL scene.
sips --resampleWidth 1920 "$SRC/3.png" --out /tmp/hoaka-poster.png >/dev/null
cwebp -quiet -q 72 -m 6 /tmp/hoaka-poster.png -o "$OUT/hero-poster.webp"
avifenc --min 26 --max 36 -s 6 -j all /tmp/hoaka-poster.png "$OUT/hero-poster.avif" >/dev/null
rm -f /tmp/hoaka-poster.png

echo "written to $OUT"
