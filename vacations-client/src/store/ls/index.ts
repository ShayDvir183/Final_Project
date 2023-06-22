export function setTokenLS(token: string): void {
  if (!token) return;
  localStorage.setItem("token", token);
}

export function clearToken_RoleLS(): { message: string } {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  return { message: `successfully logged out` };
}

export function getTokenLS(): string | null {
  return localStorage.getItem("token");
}
export function setRoleLS(role: string): void {
  if (!role) return;
  localStorage.setItem("role", role);
}
