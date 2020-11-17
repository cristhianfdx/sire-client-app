import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';

import {
  faTimesCircle,
  faChevronDown,
} from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { NotificationUtilService } from '@core/services/utils/notification-util.service';
import { RoleValidator } from '@core/validators/option-select.validator';
import { PasswordValidator } from '@core/validators/password.validator';
import { UserService } from '@core/services/user.service';
import { Role } from '@core/models/role';
import { User } from '@core/models/user';

@Component({
  selector: 'app-modal-user',
  templateUrl: './modal-user.component.html',
  styleUrls: ['./modal-user.component.scss'],
})
export class ModalUserComponent implements OnInit, OnDestroy {
  user: User;
  roles$: Observable<Role[]>;
  modalForm: FormGroup;
  action: string;
  faTimesCircle = faTimesCircle;
  faChevronDown = faChevronDown;

  constructor(
    private notificationUtilService: NotificationUtilService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    const params: any = this.activatedRoute.snapshot.params;
    if (Object.keys(params).length > 0) {
      this.user = JSON.parse(atob(params.user));
    }
  }

  ngOnDestroy(): void {
    this.user = null;
  }

  ngOnInit(): void {
    this.action = !this.user ? 'Crear' : 'Editar';
    if (this.user) {
      this.buildEditForm();
    } else {
      this.buildForm();
    }
    this.roles$ = this.userService.getRoles();
  }

  buildForm(): void {
    this.modalForm = this.formBuilder.group(
      {
        name: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        documentNumber: ['', [Validators.required]],
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
        role: ['Seleccione Rol', [Validators.required]],
      },
      {
        validators: [
          PasswordValidator.MatchPassword,
          RoleValidator.IsValidRole,
        ],
      }
    );
  }

  buildEditForm(): void {
    const { name, lastName, documentNumber, role } = this.user;

    this.modalForm = this.formBuilder.group(
      {
        name: [name],
        lastName: [lastName],
        documentNumber: [documentNumber],
        password: [''],
        confirmPassword: [''],
        role: [role.id, [Validators.required]],
      },
      {
        validator: PasswordValidator.MatchPassword,
      }
    );
  }

  save(): void {
    if (!this.modalForm.invalid) {
      if (this.user) {
        this.update();
      } else {
        const request: User = this.modalForm.value;
        this.userService.create(request).subscribe(
          () => {
            this.backToHomeSection();
            this.notificationUtilService.newOkMessage('Usuario creado.');
          },
          ({ status }) => this.throwErrorMessages(status)
        );
      }
    }
  }

  update(): void {
    const request: User = this.modalForm.value;

    if (request.password === '') {
      delete request.password;
    }

    this.userService.update(this.user.id, request).subscribe(
      () => {
        this.backToHomeSection();
        this.notificationUtilService.newOkMessage('Usuario actualizado.');
      },
      ({ status }) => this.throwErrorMessages(status)
    );
  }

  backToHomeSection(): void {
    this.router.navigate(['/users']);
  }

  throwErrorMessages(status: number): void {
    if (status === 400) {
      this.notificationUtilService.newErrorMessage(
        'Ya existe un usuario registrado con ese número de documento'
      );
    }

    if (status === 500) {
      this.notificationUtilService.newErrorMessage(
        'Estamos presentando fallas, por favor intente más tarde'
      );
    }
  }

  checkErrors(control: string): boolean {
    return (
      this.modalForm.controls[control].invalid &&
      (this.modalForm.controls[control].dirty ||
        this.modalForm.controls[control].touched)
    );
  }
}
