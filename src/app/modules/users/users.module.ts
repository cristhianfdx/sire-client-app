import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ModalUserComponent } from './components/modal/modal-user.component';
import { UsersComponent } from './components/users/users.component';
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
  declarations: [UsersComponent, ModalUserComponent],
  imports: [CommonModule, UsersRoutingModule, FontAwesomeModule],
  providers: [NgbActiveModal, NgbModal]
})
export class UsersModule {}
