import { Category } from "./category";
export interface Product {
  id: number;
  name: string;
  count: number;
  description: string;
  image: string;
  price: number;
  category: Category;
}