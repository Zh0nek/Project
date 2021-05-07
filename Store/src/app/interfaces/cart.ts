import { User } from "./user";
import { Product } from "./product";

export interface Cart {
  id: number;
  user: User;
  products: Product[];
}