import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Role } from '@core/models/role';
import { User } from '@core/models/user';

const baseUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  pathUrl = '/users';

  constructor(private http: HttpClient) {}

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(baseUrl + this.pathUrl);
  }

  create(request: User): Observable<void> {
    return this.http.post<void>(baseUrl + this.pathUrl, request);
  }

  update(id: number, request: User): Observable<void> {
    return this.http.patch<void>(`${baseUrl + this.pathUrl}/${id}`, request);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${baseUrl + this.pathUrl}/${id}`);
  }

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${baseUrl + this.pathUrl}/roles/all`);
  }
}
