import { Branch } from './branch';
import { Stock } from './stock';

export interface UpdatePartRequest {
  id?: number;
  name?: string;
  description?: string;
  imageUrl?: string;
  branch?: Branch;
  stock?: Stock;
}
