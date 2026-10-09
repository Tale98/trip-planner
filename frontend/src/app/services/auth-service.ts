import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { LoginRequest, LoginResponse, LogoutResponse } from '../models/auth';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private BASE_URL = environment.BACKEND_BASE_URL;
  verifyToken() {
    return this.http.get(`${this.BASE_URL}/auth/me`);
  }
  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.BASE_URL}/auth/login`, request);
  }
  logout(): Observable<LogoutResponse> {
    return this.http.get<LogoutResponse>(`${this.BASE_URL}/auth/logout`);
  }
}
