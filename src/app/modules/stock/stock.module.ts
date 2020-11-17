import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { StockComponent } from './components/stock/stock.component';
import { StockRoutingModule } from './stock-routing.module';
import { StockAddComponent } from './components/stock-add/stock-add.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [StockComponent, StockAddComponent],
  imports: [
    SweetAlert2Module.forRoot(),
    ReactiveFormsModule,
    StockRoutingModule,
    FontAwesomeModule,
    SharedModule,
    CommonModule,
    FormsModule,
  ],
})
export class StockModule {}
