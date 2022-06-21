export function setTokenLS(token: string) {
    if (!token) return;
    localStorage.setItem("token", token)
}

export function clearTokenLS(token: string) {
    if (!token) return;
    localStorage.removeItem("token")
}

export function getTokenLS() {
    return localStorage.getItem("token")
}
export function setRoleLS(role: string) {
    if (!role) return;
    localStorage.setItem("role", role)
}