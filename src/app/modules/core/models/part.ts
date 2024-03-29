import { Brand } from './brand';
import { Stock } from './stock';

export interface Part {
  id?: number;
  name?: string;
  description?: string;
  imageUrl?: string;
  brand?: Brand;
  stock?: Stock;
}
