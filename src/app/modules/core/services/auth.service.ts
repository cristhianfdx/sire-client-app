import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { TokenService } from '@core/services/token.service';
import { environment } from 'src/environments/environment';
import { TokenResponse } from '../models/token.response';
import { Login } from '../models/login';

const baseUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  login(request: Login): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(`${baseUrl}/auth/login`, request);
  }

  logout(): void {
    this.tokenService.removeToken();
  }
}
