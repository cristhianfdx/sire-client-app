import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { LoginRequest } from '../models/request/login.request';
import { TokenResponse } from '../models/response/token.response';

const baseUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  constructor(private http: HttpClient) {}

  login(request: LoginRequest): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(`${baseUrl}/auth/login`, request);
  }
}
