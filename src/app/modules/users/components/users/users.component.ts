import { faUserEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { NotificationUtilService } from '@core/services/utils/notification-util.service';
import { ModalUserComponent } from '../modal/modal-user.component';
import { UserService } from '@core/services/user.service';
import { User } from '@core/models/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users$: Observable<User[]>;
  faUserEdit = faUserEdit;
  faTrash = faTrash;
  faPlus = faPlus;

  constructor(
    private notificationUtilService: NotificationUtilService,
    private userService: UserService,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.users$ = this.userService.getAll();
  }

  openCreateUserModal(user: User): void {
    const modalRef = this.modalService.open(ModalUserComponent);
    if (user) {
      modalRef.componentInstance.user = user;
    }
  }

  deleteUser(id: number): void {
    this.userService.delete(id).subscribe(
      () => {
        this.notificationUtilService.newOkMessage('Usuario eliminado.');
        this.getUsers();
      },
      (err) => {
        this.notificationUtilService.newErrorMessage(`
         El Usuario no puede ser eliminado. </br>
         Se encontraron repuestos asociados.`);
      }
    );
  }
}
