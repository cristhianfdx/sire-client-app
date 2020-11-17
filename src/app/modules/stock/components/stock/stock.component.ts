import { faSearch, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { StockStatusService } from '@core/services/utils/stock-status.service';
import { StockService } from '@core/services/stock.service';
import { PartService } from '@core/services/part.service';
import { Stock } from '@core/models/stock';
import { Part } from '@core/models/part';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
})
export class StockComponent implements OnInit {
  parts$: Observable<Part[]>;
  stock$: Observable<Stock[]>;

  faSearch = faSearch;
  faMinus = faMinus;
  faPlus = faPlus;

  constructor(
    private stockStatusService: StockStatusService,
    private stockService: StockService,
    private partService: PartService
  ) {
    this.stock$ = this.stockStatusService.stock$;
  }

  ngOnInit(): void {
    this.getParts();
  }

  getParts(): void {
    this.parts$ = this.partService.getAll().pipe(
      tap((parts) =>
        parts.forEach((p) => {
          if (p.stock) {
            this.stockStatusService.addStock(p.stock);
          }
        })
      )
    );
  }

  addToStock(part: Part): void {
    const stock: Stock = {
      partId: part.id,
    };

    if (!part.stock) {
      this.stockService.create(stock).subscribe((response: Stock) => {
        this.stockStatusService.addStock(response);
      });
    } else {
      this.updateStock(part.stock.id, stock, true);
    }
  }

  removeStock(part: Part): void {
    const stock: Stock = {
      partId: part.id,
      dateOut: new Date(),
    };
    this.updateStock(part.stock.id, stock, false);
  }

  updateStock(stockId: number, stock: Stock, isAdd: boolean): void {
    this.stockService.getOne(stockId).subscribe(({ quantity }: Stock) => {
      stock.quantity = isAdd ? quantity + 1 : quantity - 1;
      this.stockService.update(stockId, stock).subscribe((response: Stock) => {
        this.stockStatusService.addStock(response);
      });
    });
  }

  getCardBackgroundImage(imageUrl: string): string {
    return `background-image: url(${imageUrl})`;
  }
}
