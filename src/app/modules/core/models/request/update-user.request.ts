import { Role } from '../response/role';

export interface UpdateUserRequest {
  id?: number;
  name?: string;
  lastName?: string;
  documentNumber?: string;
  password?: string;
  role?: Role;
}
