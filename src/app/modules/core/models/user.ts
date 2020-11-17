import { Role } from './role';

export interface User {
  id?: number;
  name?: string;
  lastName?: string;
  documentNumber?: string;
  password?: string;
  role?: Role;
}
