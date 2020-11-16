import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { NotificationUtilService } from '@core/services/utils/notification-util.service';
import { UpdatePartRequest } from '@core/models/request/update-part.request';
import { GetPartResponse } from '@core/models/response/get-part.response';
import { ModalPartComponent } from '../modal/modal-part.component';
import { PartService } from '@core/services/part.service';

@Component({
  selector: 'app-parts',
  templateUrl: './parts.component.html',
  styleUrls: ['./parts.component.scss'],
})
export class PartsComponent implements OnInit {
  parts$: Observable<GetPartResponse[]>;
  faEdit = faEdit;
  faTrash = faTrash;
  faPlus = faPlus;

  constructor(
    private notificationUtilService: NotificationUtilService,
    public activeModal: NgbActiveModal,
    private partService: PartService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getParts();
  }

  getParts(): void {
    this.parts$ = this.partService.getAll();
  }

  openCreatePartModal(part: UpdatePartRequest): void {
    const modalRef = this.modalService.open(ModalPartComponent);
    if (part) {
      modalRef.componentInstance.part = part;
    }
  }

  deletePart(id: number): void {
    this.partService.delete(id).subscribe(
      () => {
        this.notificationUtilService.newOkMessage('Repuesto eliminado.');
        this.getParts();
      },
      (err) => {
        this.notificationUtilService.newErrorMessage(
          `Estamos presentando fallas, por favor intente más tarde`
        );
      }
    );
  }
}
