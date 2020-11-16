import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { StockComponent } from './components/stock/stock.component';
import { StockRoutingModule } from './stock-routing.module';

@NgModule({
  declarations: [StockComponent],
  imports: [
    SweetAlert2Module.forRoot(),
    ReactiveFormsModule,
    StockRoutingModule,
    FontAwesomeModule,
    CommonModule,
    FormsModule,
  ],
})
export class StockModule {}
