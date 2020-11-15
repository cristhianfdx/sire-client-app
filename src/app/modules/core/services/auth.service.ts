import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { TokenService } from '@core/services/token.service';
import { environment } from 'src/environments/environment';
import { LoginRequest } from '../models/request/login.request';
import { TokenResponse } from '../models/response/token.response';

const baseUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  login(request: LoginRequest): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(`${baseUrl}/auth/login`, request);
  }

  logout(): void {
    this.tokenService.removeToken();
  }
}
