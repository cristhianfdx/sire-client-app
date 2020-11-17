import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StockAddComponent } from './components/stock-add/stock-add.component';

import { StockComponent } from './components/stock/stock.component';

const routes: Routes = [
  {
    path: '',
    component: StockComponent,
  },
  {
    path: 'add',
    component: StockAddComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StockRoutingModule {}
