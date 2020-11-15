import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { NotificationUtilService } from '@core/services/utils/notification-util.service';
import { TokenResponse } from '@core/models/response/token.response';
import { LoginRequest } from '@core/models/request/login.request';
import { AuthService } from '@core/services/auth.service';
import { TokenService } from '@core/services/token.service';

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
    private notificationUtilService: NotificationUtilService,
    private router: Router
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
          this.router.navigate(['/home']);
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
