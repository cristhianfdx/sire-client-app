import { Branch } from './branch';
import { Stock } from './stock';
import { CreateUserRequest } from './create-user.request';

export interface CreatePartRequest {
  name: string;
  description: string;
  imageUrl: string;
  branch: Branch;
  stock: Stock;
  user?: CreateUserRequest;
}
