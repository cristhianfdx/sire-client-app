import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { Brand } from '@core/models/brand';
import { Part } from '@core/models/part';
import { Observable } from 'rxjs';

const baseUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class PartService {
  pathUrl = '/parts';
  pathBranchesUrl = '/brands';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Part[]> {
    return this.http.get<Part[]>(baseUrl + this.pathUrl);
  }

  create(request: Part): Observable<void> {
    return this.http.post<void>(baseUrl + this.pathUrl, request);
  }

  update(id: number, request: Part): Observable<void> {
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
