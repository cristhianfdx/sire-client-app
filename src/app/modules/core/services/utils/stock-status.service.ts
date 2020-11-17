import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Stock } from '@core/models/stock';

@Injectable({
  providedIn: 'root',
})
export class StockStatusService {
  private stocks: Stock[] = [];
  private stock = new BehaviorSubject<Stock[]>([]);

  stock$ = this.stock.asObservable();

  constructor() {}

  addStock(stock: Stock): void {
    this.stocks = [...this.stocks, stock];
    this.stock.next(this.stocks);
  }
}
