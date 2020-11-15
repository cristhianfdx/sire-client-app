import { Role } from './role';

export interface GetUserResponse {
  id: number;
  name: string;
  lastName: string;
  documentNumber: string;
  role: Role;
}


