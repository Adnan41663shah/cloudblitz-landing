# AWS Amplify — fix “all env vars false” on /api/health

Your health response shows **no environment variables** reach API routes. That is expected on Amplify until you do the steps below.

## Step 1 — Add variables in Amplify Console

**Amplify → your app → Hosting → Environment variables** (select the branch you deploy, e.g. `main`):

| Variable | Example |
|----------|---------|
| `MONGODB_URI` | `mongodb+srv://user:pass@cluster.mongodb.net/dbname` |
| `ADMIN_PASSWORD` | strong password you will use on `/admin/login` |
| `CRM_API_URL` | `https://your-live-crm.example.com` (not localhost) |
| `EMAIL_USER` | Gmail or SMTP user |
| `EMAIL_PASS` | Google App Password (16 chars) |
| `EMAIL_RECEIVER` | inbox for lead alerts |

Click **Save**.

## Step 2 — Commit and push this repo

Ensure these files are in git and pushed:

- `amplify.yml`
- `scripts/write-production-env.sh`

They run before `next build` and copy Console vars into `.env.production`.

## Step 3 — Redeploy

**Hosting → Deployments → Redeploy this version** (or push a new commit).

A new build is required; changing env vars alone without redeploy does not update running Lambdas.

## Step 4 — Confirm in build logs

Open the latest build log. You should see:

```text
[write-production-env] Variables written for server/API routes:
ADMIN_PASSWORD
CRM_API_URL
EMAIL_PASS
...
```

If you see `(none)`, variables are not set in Amplify for that branch.

## Understanding `/api/health` status

| Status | Meaning |
|--------|---------|
| **healthy** | Everything configured and working |
| **degraded** | Core backend works; optional pieces missing (usually email) |
| **unhealthy** | A configured service failed (e.g. MongoDB down) |

If you see **degraded** with `mongodb` and `admin` **ok**, Amplify env injection is working. Add missing `EMAIL_*` variables and redeploy.

## Step 5 — Test health endpoint

```text
https://YOUR-DOMAIN/api/health
```

Expect:

- `environment.details` → all `true`
- `status` → `healthy` or `degraded` (not `unhealthy` only because of env)
- `failedServices` → `[]` if MongoDB, CRM, and email probes succeed

## Step 6 — MongoDB Atlas

**Network Access** → allow `0.0.0.0/0` (or AWS IP ranges). Without this, `mongodb` stays in `failedServices`.

## Step 7 — CRM URL

Must be **public HTTPS**, reachable from AWS. `http://localhost:5000` will never work on Amplify.

## Custom build spec in Amplify Console?

If you overrode the build image spec in the Console, either remove the override or merge in the `write-production-env.sh` step from `amplify.yml`.
