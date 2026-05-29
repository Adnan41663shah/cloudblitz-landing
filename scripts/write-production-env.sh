#!/usr/bin/env bash
# AWS Amplify injects Console env vars into the BUILD container only.
# Next.js API routes run on SSR Lambdas — they need vars in .env.production
# BEFORE `next build`. https://docs.aws.amazon.com/amplify/latest/userguide/ssr-environment-variables.html
set -euo pipefail

OUTPUT_FILE=".env.production"
touch "$OUTPUT_FILE"

env | grep -E '^(MONGODB_URI|ADMIN_PASSWORD|CRM_API_URL|EMAIL_|SES_)=' >> "$OUTPUT_FILE" || true

echo "[write-production-env] Variables written for server/API routes:"
grep -E '^[A-Z_]+=' "$OUTPUT_FILE" | cut -d= -f1 | sort -u || echo "(none — add vars in Amplify Console)"
