import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Component, OnInit } from '@angular/core';

import { AuthService } from '@core/services/auth.service';
import { Router } from '@angular/router';

interface Menu {
  class: string;
  route: string;
  name: string;
  validateRole: boolean;
}

const COMMON_CLASS =
  'px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline';

const menuData: Menu[] = [
  {
    class: COMMON_CLASS,
    route: '/home',
    name: 'Inicio',
    validateRole: true,
  },
  {
    class: COMMON_CLASS,
    route: '/users',
    name: 'Usuarios',
    validateRole: true,
  },
  {
    class: COMMON_CLASS,
    route: '/parts',
    name: 'Repuestos',
    validateRole: true,
  },
  {
    class: COMMON_CLASS,
    route: '/stock',
    name: 'Stock',
    validateRole: false,
  },
];

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  showMenu = false;
  menuData: Menu[];
  faSignOutAlt = faSignOutAlt;

  constructor(
    private jwtHelper: JwtHelperService,
    private authService: AuthService,
    private router: Router
  ) {
    this.menuData = menuData.filter(
      (item: Menu) => item.validateRole === this.isAuthorize()
    );
  }

  ngOnInit(): void {}

  toggleNavbar(): void {
    this.showMenu = !this.showMenu;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  private isAuthorize(): boolean {
    const token = localStorage.getItem('token');
    const tokenData = this.jwtHelper.decodeToken(token);
    return tokenData.role.name === 'Admin';
  }
}
