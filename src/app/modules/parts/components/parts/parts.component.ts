import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { NotificationUtilService } from '@core/services/utils/notification-util.service';
import { PartService } from '@core/services/part.service';
import { Part } from '@core/models/part';
import { Router } from '@angular/router';

@Component({
  selector: 'app-parts',
  templateUrl: './parts.component.html',
  styleUrls: ['./parts.component.scss'],
})
export class PartsComponent implements OnInit {
  parts$: Observable<Part[]>;
  faEdit = faEdit;
  faTrash = faTrash;
  faPlus = faPlus;

  constructor(
    private notificationUtilService: NotificationUtilService,
    private partService: PartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getParts();
  }

  getParts(): void {
    this.parts$ = this.partService.getAll();
  }

  createPart(): void {
    this.router.navigate(['/parts/management']);
  }

  editPart(part: Part): void {
    this.router.navigate([
      '/parts/management',
      { part: btoa(JSON.stringify(part)) },
    ]);
  }

  deletePart(id: number): void {
    this.partService.delete(id).subscribe(
      () => {
        this.notificationUtilService.newOkMessage('Repuesto eliminado.');
        this.getParts();
      },
      (err) => {
        if (err.status === 400) {
          this.notificationUtilService.newErrorMessage(
            `No se puede eliminar el repuesto, porque tiene existencias en stock.`
          );
        } else {
          this.notificationUtilService.newErrorMessage(
            `Estamos presentando fallas, por favor intente más tarde.`
          );
        }
      }
    );
  }
}
