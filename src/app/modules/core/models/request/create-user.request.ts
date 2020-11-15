import { Role } from '../response/role';

export interface CreateUserRequest {
  name: string;
  lastName: string;
  documentNumber: string;
  password: string;
  role: Role;
}
