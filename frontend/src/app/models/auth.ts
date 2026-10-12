export interface LoginRequest {
  username: string;
  password: string;
}
export interface LoginResponse {
  message: string;
}

export interface LogoutResponse {
  message: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  message: string;
}
