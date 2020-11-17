import { Pipe, PipeTransform } from '@angular/core';
import { Stock } from '@core/models/stock';

@Pipe({
  name: 'stockQuantity',
})
export class StockPipe implements PipeTransform {
  transform(value: Stock[], stock?: Stock): any {
    const stockFound: Stock = value.find((element) => element.id === stock.id);
    return stockFound ? stockFound.quantity : 0;
  }
}
