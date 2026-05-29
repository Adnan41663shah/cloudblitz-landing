/** Server-side env helpers (values must exist in .env.production on Amplify — see amplify.yml). */

export function trimEnv(value: string | undefined): string | undefined {
  if (!value) return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

export function getAdminPassword(): string {
  return trimEnv(process.env.ADMIN_PASSWORD) || 'password123';
}

export function getMongoUri(): string | undefined {
  return trimEnv(process.env.MONGODB_URI);
}

export function getCrmApiUrl(): string | undefined {
  return trimEnv(process.env.CRM_API_URL);
}
