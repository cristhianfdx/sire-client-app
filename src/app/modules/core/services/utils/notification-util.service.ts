import { Injectable } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';

@Injectable({
  providedIn: 'root',
})
export class NotificationUtilService {
  constructor(private service: NotificationsService) {}

  options = {
    position: ['bottom', 'right'],
    timeOut: 3000,
    lastOnBottom: true,
    preventDuplicates: true,
    showProgressBar: true,
    pauseOnHover: true,
    clickToClose: true,
  };

  public newOkMessage(message: string): void {
    this.service.success('OK', message, this.options);
  }

  public newErrorMessage(message: string): void {
    this.service.error('Error', message, this.options);
  }

  public newWarnMessage(message: string): void {
    this.service.warn('Alerta', message, this.options);
  }
}
