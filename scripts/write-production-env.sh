#!/usr/bin/env bash
# AWS Amplify injects Console env vars into the BUILD container only.
# Next.js API routes need them in .env.production BEFORE `next build`.
set -euo pipefail

OUTPUT_FILE=".env.production"
: > "$OUTPUT_FILE"

# Exact names used by the app — must match Amplify Console keys character-for-character
REQUIRED_KEYS=(
  MONGODB_URI
  ADMIN_PASSWORD
  CRM_API_URL
)

EMAIL_KEYS=(
  EMAIL_USER
  EMAIL_PASS
  EMAIL_RECEIVER
)

OPTIONAL_KEYS=(
  EMAIL_FROM
  EMAIL_HOST
  EMAIL_PORT
  EMAIL_SECURE
  EMAIL_PROVIDER
  SES_FROM_EMAIL
  SES_REGION
)

write_var() {
  local key="$1"
  local value="${!key:-}"
  if [ -z "$value" ]; then
    return 1
  fi
  # Quote values that need it for dotenv parsers
  if [[ "$value" =~ [[:space:]#\"\'] ]]; then
    local escaped="${value//\\/\\\\}"
    escaped="${escaped//\"/\\\"}"
    printf '%s="%s"\n' "$key" "$escaped" >> "$OUTPUT_FILE"
  else
    printf '%s=%s\n' "$key" "$value" >> "$OUTPUT_FILE"
  fi
  return 0
}

FOUND=()
MISSING=()

for key in "${REQUIRED_KEYS[@]}" "${EMAIL_KEYS[@]}" "${OPTIONAL_KEYS[@]}"; do
  if write_var "$key"; then
    FOUND+=("$key")
  else
    MISSING+=("$key")
  fi
done

echo "========================================"
echo "[write-production-env] Written to .env.production:"
if [ ${#FOUND[@]} -eq 0 ]; then
  echo "  (none)"
else
  printf '  %s\n' "${FOUND[@]}"
fi

echo "[write-production-env] Not set in Amplify build environment:"
if [ ${#MISSING[@]} -eq 0 ]; then
  echo "  (none)"
else
  printf '  %s\n' "${MISSING[@]}"
fi

EMAIL_MISSING=0
for key in "${EMAIL_KEYS[@]}"; do
  if [[ " ${MISSING[*]} " == *" $key "* ]]; then
    EMAIL_MISSING=1
    echo "[write-production-env] WARNING: $key is missing — lead emails will NOT work until you add it under Hosting → Environment variables (not only Secrets) and redeploy."
  fi
done

echo "========================================"

if [ "$EMAIL_MISSING" -eq 1 ]; then
  echo "[write-production-env] TIP: Local .env is NOT deployed. Copy EMAIL_USER, EMAIL_PASS, EMAIL_RECEIVER from .env into Amplify Console for this branch, then Redeploy."
fi
