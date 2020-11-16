import { Brand } from './brand';
import { Stock } from './stock';
import { CreateUserRequest } from './create-user.request';

export interface CreatePartRequest {
  name: string;
  description: string;
  imageUrl: string;
  brand: Brand;
  stock: Stock;
  user?: CreateUserRequest;
}
