import { AbstractControl } from '@angular/forms';

export class RoleValidator {
  static IsValidRole(ac: AbstractControl): any {
    const role = ac.get('role').value;
    if (role === 'Seleccione Rol') {
      ac.get('role').setErrors({ IsValidRole: true });
    } else {
      return null;
    }
  }
}

export class BrandValidator {
  static IsValidBrand(ac: AbstractControl): any {
    const brand = ac.get('branch').value;
    if (brand === 'Seleccione Marca') {
      ac.get('branch').setErrors({ IsValidBrand: true });
    } else {
      return null;
    }
  }
}
