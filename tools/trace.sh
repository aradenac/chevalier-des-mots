#!/usr/bin/env bash
# [impl->req~verify.traceability-validation~1]
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
JAR="$ROOT/tools/openfasttrace/openfasttrace.jar"
OUTDIR="$ROOT/build/traceability"
TEXT_REPORT="$OUTDIR/openfasttrace.txt"
HTML_REPORT="$OUTDIR/openfasttrace.html"
QUIET=0
SCAN_PATHS=(
  "$ROOT/docs"
  "$ROOT/src"
  "$ROOT/tests"
  "$ROOT/tools"
  "$ROOT/mkdocs.yml"
)

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

TEXT_CMD=(
  java -jar "$JAR" trace
  -o plain
  -v all
  -f "$TEXT_REPORT"
  "${SCAN_PATHS[@]}"
)

HTML_CMD=(
  java -jar "$JAR" trace
  -o html
  -v all
  --details-section-display expand
  -f "$HTML_REPORT"
  "${SCAN_PATHS[@]}"
)

format_command() {
  printf '%q ' "$@"
}

if [ "$QUIET" -eq 0 ]; then
  echo "Lancement OpenFastTrace..."
  echo "Dossiers scannés :"
  for path in "${SCAN_PATHS[@]}"; do
    echo "  - $path"
  done
fi

JAVA_STDOUT=/dev/stdout
JAVA_STDERR=/dev/stderr
if [ "$QUIET" -eq 1 ]; then
  JAVA_STDOUT=/dev/null
  JAVA_STDERR=/dev/null
fi

rm -f "$TEXT_REPORT" "$HTML_REPORT"

if "${TEXT_CMD[@]}" >"$JAVA_STDOUT" 2>"$JAVA_STDERR"; then
  :
else
  status=$?
  if [ "$QUIET" -eq 0 ]; then
    echo "Échec OpenFastTrace pendant la génération du rapport texte." >&2
    echo "Commande texte : $(format_command "${TEXT_CMD[@]}")" >&2
    if [ -f "$TEXT_REPORT" ]; then
      echo "Rapport texte : $TEXT_REPORT" >&2
      cat "$TEXT_REPORT" >&2
    fi
  fi
  exit "$status"
fi

if "${HTML_CMD[@]}" >"$JAVA_STDOUT" 2>"$JAVA_STDERR"; then
  if [ "$QUIET" -eq 0 ]; then
    echo "Traçabilité validée par OpenFastTrace."
    echo "Rapport texte : $TEXT_REPORT"
    echo "Rapport HTML : $HTML_REPORT"
    echo "Commande texte : $(format_command "${TEXT_CMD[@]}")"
    echo "Commande HTML : $(format_command "${HTML_CMD[@]}")"
    if [ -f "$TEXT_REPORT" ]; then
      echo "Aperçu du rapport texte :"
      sed -n '1,80p' "$TEXT_REPORT"
    fi
  fi
else
  status=$?
  if [ "$QUIET" -eq 0 ]; then
    echo "Échec OpenFastTrace pendant la génération du rapport HTML." >&2
    echo "Commande HTML : $(format_command "${HTML_CMD[@]}")" >&2
    if [ -f "$HTML_REPORT" ]; then
      echo "Rapport HTML : $HTML_REPORT" >&2
    fi
    echo "Rapport texte : $TEXT_REPORT" >&2
  fi
  exit "$status"
fi
