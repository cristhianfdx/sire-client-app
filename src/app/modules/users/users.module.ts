import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UsersComponent } from './components/users/users.component';
import { UsersRoutingModule } from './users-routing.module';


@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    FontAwesomeModule
  ]
})
export class UsersModule { }
