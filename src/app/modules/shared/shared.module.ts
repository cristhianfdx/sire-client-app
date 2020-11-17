import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { StockPipe } from './pipe/stock.pipe';
@NgModule({
  declarations: [NavbarComponent, FooterComponent, StockPipe],
  imports: [ReactiveFormsModule, FontAwesomeModule, CommonModule, RouterModule],
  exports: [NavbarComponent, FooterComponent, StockPipe],
})
export class SharedModule {}
