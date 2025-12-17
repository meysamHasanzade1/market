// src/types/product.ts
export interface Product {
  id: number ;
  name?:string;
  title: string;
  description?: string;
  price: number;
  thumbnail: string;
  quantity?: number;
  createdAt?:string;
}
