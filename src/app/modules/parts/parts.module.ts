import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ModalPartComponent } from './components/modal/modal-part.component';
import { PartsComponent } from './components/parts/parts.component';
import { PartsRoutingModule } from './parts-routing.module';

@NgModule({
  declarations: [PartsComponent, ModalPartComponent],
  imports: [
    SweetAlert2Module.forRoot(),
    CommonModule,
    PartsRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [NgbActiveModal, NgbModal],
})
export class PartsModule {}
