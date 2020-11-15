import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import {
  faTimesCircle,
  faChevronDown,
} from '@fortawesome/free-solid-svg-icons';
import { PasswordValidator } from './password.validator';
import { Observable } from 'rxjs';

import { NotificationUtilService } from '@core/services/utils/notification-util.service';
import { UpdateUserRequest } from '@core/models/request/update-user.request';
import { CreateUserRequest } from '@core/models/request/create-user.request';
import { UserService } from '@core/services/user.service';
import { Role } from '@core/models/response/role';

@Component({
  selector: 'app-modal-user',
  templateUrl: './modal-user.component.html',
  styleUrls: ['./modal-user.component.scss'],
})
export class ModalUserComponent implements OnInit, OnDestroy {
  @Input() public user: UpdateUserRequest;
  roles$: Observable<Role[]>;
  modalForm: FormGroup;
  action: string;
  faTimesCircle = faTimesCircle;
  faChevronDown = faChevronDown;

  constructor(
    private notificationUtilService: NotificationUtilService,
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private userService: UserService
  ) {}

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
        documentNumber: ['', Validators.required],
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
        role: ['Seleccione Rol', [Validators.required]],
      },
      {
        validator: PasswordValidator.MatchPassword,
      }
    );
  }

  buildEditForm(): void {
    const { name, lastName, documentNumber, role } = this.user;

    this.modalForm = this.formBuilder.group(
      {
        name: [name, [Validators.required]],
        lastName: [lastName, [Validators.required]],
        documentNumber: [documentNumber, Validators.required],
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
        const request: CreateUserRequest = this.modalForm.value;
        this.userService.create(request).subscribe(
          () => {
            this.activeModal.dismiss('Cross click');
            this.notificationUtilService.newOkMessage('Usuario creado.');
          },
          ({ status }) => this.throwErrorMessages(status)
        );
      }
    }
  }

  update(): void {
    const request: UpdateUserRequest = this.modalForm.value;

    if (request.password === '') {
      delete request.password;
    }

    this.userService.update(this.user.id, request).subscribe(
      () => {
        this.activeModal.dismiss('Cross click');
        this.notificationUtilService.newOkMessage('Usuario actualizado.');
      },
      ({ status }) => this.throwErrorMessages(status)
    );
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
