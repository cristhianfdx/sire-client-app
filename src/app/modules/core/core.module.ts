import { SimpleNotificationsModule } from 'angular2-notifications';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NotificationUtilService } from './services/utils/notification-util.service';
import { FirebaseStorageService } from './services/firebase-storage.service';
import { TokenService } from './services/token.service';
import { AuthService } from './services/auth.service';
import { PartService } from './services/part.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, SimpleNotificationsModule.forRoot()],
  providers: [
    NotificationUtilService,
    FirebaseStorageService,
    TokenService,
    PartService,
    AuthService,
  ],
})
export class CoreModule {}
