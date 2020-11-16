import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CreatePartRequest } from '@core/models/request/create-part.request';
import { GetPartResponse } from '@core/models/response/get-part.response';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { UpdatePartRequest } from '@core/models/request/update-part.request';
import { Brand } from '@core/models/request/brand';

const baseUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class PartService {
  pathUrl = '/parts';
  pathBranchesUrl = '/brands';

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

  createBrands(brand: Brand): Observable<void> {
    return this.http.post<void>(baseUrl + this.pathBranchesUrl, brand);
  }

  getBrands(): Observable<Brand[]> {
    return this.http.get<Brand[]>(baseUrl + this.pathBranchesUrl);
  }
}
