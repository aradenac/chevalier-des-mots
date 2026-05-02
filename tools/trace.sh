#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
JAR="$ROOT/tools/openfasttrace/openfasttrace.jar"
OUTDIR="$ROOT/build/traceability"
REPORT="$OUTDIR/openfasttrace.txt"
mkdir -p "$OUTDIR"

missing=0
if ! command -v java >/dev/null 2>&1; then
  echo "Java est introuvable. Installez Java 17 ou plus récent, puis placez le JAR OpenFastTrace dans tools/openfasttrace/openfasttrace.jar." >&2
  missing=1
fi

if [ ! -f "$JAR" ]; then
  echo "OpenFastTrace est manquant: $JAR" >&2
  echo "Installez le JAR depuis Maven Central ou les releases GitHub OpenFastTrace, puis relancez: npm run trace" >&2
  missing=1
fi

if [ "$missing" -ne 0 ]; then
  exit 1
fi

java -jar "$JAR" trace -o plain -f "$REPORT" \
  "$ROOT/docs" \
  "$ROOT/src" \
  "$ROOT/tests"
