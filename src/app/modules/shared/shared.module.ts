import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NavbarComponent } from './components/navbar/navbar.component';
@NgModule({
  declarations: [NavbarComponent],
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule, RouterModule],
  exports: [NavbarComponent],
})
export class SharedModule {}
