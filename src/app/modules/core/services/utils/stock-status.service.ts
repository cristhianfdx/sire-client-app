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

  updateStock(stock: Stock): void {
    const stocks: Stock[] = this.stock.getValue();
    const found: Stock = stocks.find((el) => el.id === stock.id);
    const index: number = stocks.indexOf(found);
    stocks.splice(index, 1);
    this.addStock(stock);
  }
}
