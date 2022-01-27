import { Product } from "src/app/domain/product-interfaces";


 const ProductMock: Product = {
  id: 1,
  code: 'code_first',
  name: 'Name_first',
  createdAt: new Date(),
};

const productSecondMock: Product = {
  id: 2,
  code: 'Code_second',
  name: 'Name_second',
  createdAt: new Date(),
};

const ProductsMock = { products: [ProductMock, ProductMock] };

export {
  ProductMock ,
  productSecondMock,
  ProductsMock
}
