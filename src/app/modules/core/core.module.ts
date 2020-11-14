import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleNotificationsModule } from 'angular2-notifications';

import { NotificationUtilService } from './services/utils/notification-util.service';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SimpleNotificationsModule.forRoot(),
  ],
  providers: [
    AuthService,
    TokenService,
    NotificationUtilService
  ]
})
export class CoreModule { }
