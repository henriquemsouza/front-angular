import { Category, Product } from './../../domain/product-interfaces';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { CategoryService } from 'src/app/services/category.service';

import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  GenericErrorMessage,
  SuccessMessage,
} from 'src/app/utils/general-messages';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  currentProduct!: Product;
  productForm!: FormGroup;
  categories!: Category[];
  productId = '';
  errorMessage = '';
  showError = false;
  showLoader = true;
  buttonDisabled: boolean = false;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    const productId = `${this.route.snapshot.paramMap.get('id')}`;
    this.productId = productId;

    this.initFormBuilder();
    this.findCategories();

    this.getProduct(productId);
  }

  private initFormBuilder() {
    this.productForm = this.formBuilder.group({
      name: ['', { Validators: Validators.required, updateOn: 'blur' }],
      code: ['', { Validators: Validators.required, updateOn: 'blur' }],
      category: ['', { Validators: Validators.required, updateOn: 'blur' }],
    });
  }

  private findCategories() {
    this.categoryService.getAll().subscribe(
      (data) => {
        this.categories = data.categories;

        this.setCurrentCategory();
      },
      (error) => {
        this.showError = true;
        this.errorMessage = error;
      }
    );
  }

  private setCurrentCategory() {
    if (this.currentProduct && this.categories) {
      this.productForm.controls['category'].setValue(
        this.currentProduct?.category?.id,
        { onlySelf: true }
      );
    }
  }

  getProduct(id: string): void {
    this.productService.get(id).subscribe(
      (data) => {
        this.currentProduct = data.products[0];

        this.setCurrentCategory();
        this.showLoader = false;
      },
      (error) => {
        GenericErrorMessage();
        console.log(error);
      }
    );
  }

  updateProduct(): void {
    if (!this.productForm.valid) {
      return;
    }

    const data = {
      id: this.currentProduct?.id,
      name: this.productForm.get('name')?.value,
      categoryId: this.productForm.get('category')?.value,
    };

    console.log('****', data);
    this.buttonDisabled = true;

    this.productService.update(data).subscribe(
      (response) => {
        SuccessMessage('Product successfully updated!');
        this.buttonDisabled = false;

        this.router.navigate(['']);
      },
      (error) => {
        GenericErrorMessage();
        this.showError = true;
        this.errorMessage = error.error.message;
        this.buttonDisabled = false;
      }
    );
  }
}
