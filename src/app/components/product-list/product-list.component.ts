import { Product } from './../../domain/product-interfaces';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { CategoryService } from 'src/app/services/category.service';
import {
  GenericErrorMessage,
  SuccessMessage,
} from 'src/app/utils/general-messages';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products!: Product[];
  currentProduct!: Product | undefined;
  currentIndex = -1;
  code = '';
  categoryId: string = '';
  showLoader = true;
  categories = null;
  buttonDisabled: boolean = false;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.listAllProducts();
    this.loadCategories();
  }

  listAllProducts(): void {
    this.productService.getAll().subscribe(
      (data) => {
        this.products = data.products;
        this.showLoader = false;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  private loadCategories() {
    this.categoryService.getAll().subscribe(
      (data) => {
        this.categories = data.categories;
      },
      (error) => {}
    );
  }

  refreshList(): void {
    this.listAllProducts();
    this.currentProduct = undefined;
    this.currentIndex = -1;
  }

  setSelectedProduct(product: Product, index: number): void {
    this.currentProduct = product;
    this.currentIndex = index;
  }

  searchProduct(): void {
    this.currentProduct = undefined;
    this.currentIndex = -1;
    this.productService.searchProduct(this.code, this.categoryId).subscribe(
      (data) => {
        this.products = data.products;

        console.log(data);
      },
      (error) => {
        GenericErrorMessage();
      }
    );
  }

  deleteProduct(): void {
    this.buttonDisabled = true;
    const productId = this.currentProduct?.id;
    console.log('id,', this.currentProduct);

    this.showLoader = false;

    this.productService.delete(`${productId}`).subscribe(
      (data) => {
        this.showLoader = false;
        this.buttonDisabled = true;

        SuccessMessage('Product successfully deleted!');

        window.location.reload();
      },
      (error) => {
        GenericErrorMessage();
        this.buttonDisabled = true;
        console.log(error);
      }
    );
  }
}
