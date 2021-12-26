export interface Product {
  id: number;
  code: string;
  name: string;
  createdAt: Date;
  category?: Category;
}

export interface Category {
  id: number;
  name: string;
}
