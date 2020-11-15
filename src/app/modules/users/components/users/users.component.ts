import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ModalUserComponent } from '../modal/modal-user.component';
import { faUserEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '@core/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users$: Observable<any>;
  faUserEdit = faUserEdit;
  faTrash = faTrash;
  faPlus = faPlus;
  users: [];

  constructor(
    private userService: UserService,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.users$ = this.userService.getUsers();
  }

  openCreateUserModal(): void {
    this.modalService.open(ModalUserComponent, { size: 'lg' });
  }
}
