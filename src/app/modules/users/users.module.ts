import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ModalUserComponent } from './components/modal/modal-user.component';
import { UsersComponent } from './components/users/users.component';
import { UsersRoutingModule } from './users-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [UsersComponent, ModalUserComponent],
  imports: [
    SweetAlert2Module.forRoot(),
    CommonModule,
    UsersRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [NgbActiveModal, NgbModal],
})
export class UsersModule {}
