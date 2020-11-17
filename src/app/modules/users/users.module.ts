import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ModalUserComponent } from './components/modal/modal-user.component';
import { UsersComponent } from './components/users/users.component';
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
  declarations: [UsersComponent, ModalUserComponent],
  imports: [
    SweetAlert2Module.forRoot(),
    ReactiveFormsModule,
    UsersRoutingModule,
    FontAwesomeModule,
    CommonModule,
    FormsModule,
  ],
  providers: [],
})
export class UsersModule {}
