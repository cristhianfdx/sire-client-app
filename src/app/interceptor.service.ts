import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { TokenService } from './modules/core/services/token.service';

@Injectable()
export class InterceptorService implements HttpInterceptor {
  constructor(private tokenService: TokenService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = this.addToken(request);
    return next.handle(request);
  }

  private addToken(request: HttpRequest<any>): HttpRequest<any> {
    const token = this.tokenService.getToken();
    if (token) {
      request = request.clone({
        setHeaders: {
          token,
        },
      });
      return request;
    }
    return request;
  }
}
