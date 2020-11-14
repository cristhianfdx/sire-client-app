import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { LoginRequest } from '@core/models/request/login.request';
import { TokenResponse } from '@core/models/response/token.response';
import { AuthServiceService } from '@core/services/auth-service.service';
import { TokenServiceService } from '@core/services/token-service.service';

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
    private authService: AuthServiceService,
    private tokenService: TokenServiceService
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
      this.subscription = this.authService
        .login(request)
        .subscribe(({ token }: TokenResponse) => {
          this.tokenService.saveToken(token);
        });
    }
  }
}
