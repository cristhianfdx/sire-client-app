import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { NotificationUtilService } from '@core/services/utils/notification-util.service';
import { AuthService } from '@core/services/auth.service';
import { TokenService } from '@core/services/token.service';
import { LoginRequest } from '@core/models/request/login.request';
import { TokenResponse } from '@core/models/response/token.response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private tokenService: TokenService,
    private notificationUtilService: NotificationUtilService
  ) {
    this.buildForm();
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      documentNumber: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  login(): void {
    if (!this.form.invalid) {
      const request: LoginRequest = this.form.value;
      this.subscription = this.authService.login(request).subscribe(
        ({ token }: TokenResponse) => {
          this.tokenService.saveToken(token);
        },
        (error) => {
          this.notificationUtilService.newErrorMessage(
            'Sus credenciales son incorrectas, por favor intente de nuevo.'
          );
        }
      );
    }
  }

  checkErrors(control: string): boolean {
    return (
      this.form.controls[control].invalid &&
      (this.form.controls[control].dirty || this.form.controls[control].touched)
    );
  }
}
