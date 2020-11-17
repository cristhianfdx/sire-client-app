import { faUserEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { NotificationUtilService } from '@core/services/utils/notification-util.service';
import { UserService } from '@core/services/user.service';
import { User } from '@core/models/user';
import { Router } from '@angular/router';

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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.users$ = this.userService.getAll();
  }

  createUser(): void {
    this.router.navigate(['/users/management']);
  }

  editUser(user: User): void {
    this.router.navigate([
      '/users/management',
      { user: btoa(JSON.stringify(user)) },
    ]);
  }

  deleteUser(id: number): void {
    this.userService.delete(id).subscribe(
      () => {
        this.notificationUtilService.newOkMessage('Usuario eliminado.');
        this.getUsers();
      },
      (err) => {
        if (err.status === 400) {
          this.notificationUtilService.newErrorMessage(`
         El Usuario que se encuentra en sesión no puede ser eliminado.`);
        } else {
          this.notificationUtilService.newErrorMessage(`
         El Usuario no puede ser eliminado. </br>
         Se encontraron repuestos asociados.`);
        }
      }
    );
  }
}
