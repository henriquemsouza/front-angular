import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

export interface Category {
  id: number;
  name: string;
}

export interface product {
  id: number;
  code: string;
  name: string;
  createdAt: Date;
  category?: Category;
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products!: product[];
  currentProduct: product | undefined;
  currentIndex = -1;
  title = '';
  showLoader = true;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.listAllProducts();
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

  refreshList(): void {
    this.listAllProducts();
    this.currentProduct = undefined;
    this.currentIndex = -1;
  }

  setSelectedProduct(product: product, index: number): void {
    this.currentProduct = product;
    this.currentIndex = index;
  }

  searchTitle(): void {
    this.productService.findByTitle(this.title).subscribe(
      (data) => {
        this.products = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteProduct() {
    const productId = this.currentProduct?.id;
    console.log('id,', this.currentProduct);

    this.showLoader = false;

    this.productService.delete(`${productId}`).subscribe(
      (data) => {
        this.showLoader = false;

        Swal.fire('Product successfully deleted!', '', 'success');
        window.location.reload();
      },
      (error) => {
        Swal.fire('Oops... something went wrong', '', 'error');
        console.log(error);
      }
    );
  }
}
