// Single-admin allow-list, per project-overview.md - not a roles table.
export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;

  const allowList = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((entry) => entry.trim().toLowerCase())
    .filter(Boolean);

  return allowList.includes(email.trim().toLowerCase());
}
