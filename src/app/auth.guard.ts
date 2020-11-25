import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
  CanLoad,
  Route,
  UrlSegment,
} from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { TokenService } from '@core/services/token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(
    private jwtHelper: JwtHelperService,
    private tokenService: TokenService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const token = this.tokenService.getToken();
    if (!this.jwtHelper.isTokenExpired(token) || token) {
      return true;
    }
    this.tokenService.removeToken();
    this.router.navigate(['/auth/login']);
    return false;
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean>
    | boolean {
    const token = this.tokenService.getToken();
    const roleName = this.getRole(token);
    if ('Admin' === roleName) {
      return true;
    }
    this.router.navigate(['/stock']);
    return false;
  }

  private getRole(token: string): string {
    const tokenData = this.jwtHelper.decodeToken(token);
    if (tokenData) {
      return tokenData.role.name;
    }
  }
}
