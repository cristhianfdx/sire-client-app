import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '@core/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users$: Observable<any>;
  faEdit = faEdit;
  faTrash = faTrash;
  faPlus = faPlus;
  users: [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.users$ = this.userService.getUsers();
  }
}
