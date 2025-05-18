export interface AuthState {
    token: string
    setToken: (newToken: string) => void
}