import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Stock } from '@core/models/stock';

const baseUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class StockService {
  pathUrl = '/stock';

  constructor(private http: HttpClient) {}

  create(request: Stock): Observable<Stock> {
    return this.http.post<Stock>(baseUrl + this.pathUrl, request);
  }

  update(id: number, request: Stock): Observable<Stock> {
    return this.http.patch<Stock>(`${baseUrl + this.pathUrl}/${id}`, request);
  }

  getOne(id: number): Observable<Stock> {
    return this.http.get<Stock>(`${baseUrl + this.pathUrl}/${id}`);
  }
}
