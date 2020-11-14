import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenServiceService {
  constructor() {}

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  removeToken(): void {
    localStorage.removeItem('token');
  }
}
