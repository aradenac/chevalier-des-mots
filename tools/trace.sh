#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
JAR="$ROOT/tools/openfasttrace/openfasttrace.jar"
OUTDIR="$ROOT/build/traceability"
REPORT="$OUTDIR/openfasttrace.txt"
QUIET=0

for arg in "$@"; do
  case "$arg" in
    --quiet|-q)
      QUIET=1
      ;;
    *)
      echo "Usage: $0 [--quiet]" >&2
      exit 2
      ;;
  esac
done

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

if [ "$QUIET" -eq 0 ]; then
  echo "Lancement OpenFastTrace..."
  echo "Dossiers scannés :"
  echo "  - $ROOT/docs"
  echo "  - $ROOT/src"
  echo "  - $ROOT/tests"
  echo "Rapport : $REPORT"
fi

JAVA_STDOUT=/dev/stdout
JAVA_STDERR=/dev/stderr
if [ "$QUIET" -eq 1 ]; then
  JAVA_STDOUT=/dev/null
  JAVA_STDERR=/dev/null
fi

if java -jar "$JAR" trace -o plain -f "$REPORT" \
  "$ROOT/docs" \
  "$ROOT/src" \
  "$ROOT/tests" \
  >"$JAVA_STDOUT" 2>"$JAVA_STDERR"; then
  if [ "$QUIET" -eq 0 ]; then
    echo "Traçabilité validée par OpenFastTrace."
    echo "Rapport : $REPORT"
    if [ -f "$REPORT" ]; then
      sed -n '1,120p' "$REPORT"
    fi
  fi
else
  status=$?
  if [ "$QUIET" -eq 0 ]; then
    echo "Échec OpenFastTrace." >&2
    if [ -f "$REPORT" ]; then
      echo "Rapport : $REPORT" >&2
      cat "$REPORT" >&2
    fi
  fi
  exit "$status"
fi
