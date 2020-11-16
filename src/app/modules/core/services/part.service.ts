import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CreatePartRequest } from '@core/models/request/create-part.request';
import { GetPartResponse } from '@core/models/response/get-part.response';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { UpdatePartRequest } from '@core/models/request/update-part.request';
import { Branch } from '@core/models/request/branch';

const baseUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class PartService {
  pathUrl = '/parts';
  pathBranchesUrl = '/branches';

  constructor(private http: HttpClient) {}

  getAll(): Observable<GetPartResponse[]> {
    return this.http.get<GetPartResponse[]>(baseUrl + this.pathUrl);
  }

  create(request: CreatePartRequest): Observable<void> {
    return this.http.post<void>(baseUrl + this.pathUrl, request);
  }

  update(id: number, request: UpdatePartRequest): Observable<void> {
    return this.http.patch<void>(`${baseUrl + this.pathUrl}/${id}`, request);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${baseUrl + this.pathUrl}/${id}`);
  }

  createBranch(branch: Branch): Observable<void> {
    return this.http.post<void>(baseUrl + this.pathBranchesUrl, branch);
  }

  getBranches(): Observable<Branch[]> {
    return this.http.get<Branch[]>(baseUrl + this.pathBranchesUrl);
  }
}
