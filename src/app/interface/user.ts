export interface User {
  id?: string
  username: string
  email: string
  password?: string
  fullName?: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  username: string
  email: string
  password: string
  fullName?: string
}

export interface AuthResponse {
  user: User
  token: string
}

