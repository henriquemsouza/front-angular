import { Category } from 'src/app/domain/product-interfaces';

const CategoryMock: Category = {
  id: 1,
  name: 'Category fist',
};

const CategoriesMock = { categories: [CategoryMock] };

export { CategoryMock, CategoriesMock };
