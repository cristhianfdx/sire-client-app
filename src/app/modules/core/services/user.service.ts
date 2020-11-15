import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Role } from '@core/models/response/role';
import { GetUserResponse } from '@core/models/response/get-user.response';
import { CreateUserRequest } from '@core/models/request/create-user.request';
import { UpdateUserRequest } from '@core/models/request/update-user.request';

const baseUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  pathUrl = '/users';

  constructor(private http: HttpClient) {}

  getAll(): Observable<GetUserResponse[]> {
    return this.http.get<GetUserResponse[]>(baseUrl + this.pathUrl);
  }

  create(request: CreateUserRequest): Observable<void> {
    return this.http.post<void>(baseUrl + this.pathUrl, request);
  }

  update(id: number, request: UpdateUserRequest): Observable<void> {
    return this.http.patch<void>(`${baseUrl + this.pathUrl}/${id}`, request);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${baseUrl + this.pathUrl}/${id}`);
  }

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${baseUrl + this.pathUrl}/roles/all`);
  }
}
