export function setTokenLS(token: string) {
    if (!token) return;
    localStorage.setItem("token", token)
}

export function clearToken_RoleLS(token: string | null) {
    if (!token) return;
    localStorage.removeItem("token")
    localStorage.removeItem("role")
    return { message: `successfully logged out` }
}

export function getTokenLS(): string | null {
    return localStorage.getItem("token")
}
export function setRoleLS(role: string) {
    if (!role) return;
    localStorage.setItem("role", role)
}