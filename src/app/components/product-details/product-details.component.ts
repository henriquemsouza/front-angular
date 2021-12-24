import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { CategoryService } from 'src/app/services/category.service';

import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  currentProduct: product | undefined;
  productForm!: FormGroup;
  categories = null;
  productId = '';
  errorMessage = '';
  showError = false;

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

    this.getProduct(productId);

    this.findCategories();
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
      },
      (error) => {
        this.showError = true;
        this.errorMessage = error;
      }
    );
  }

  getProduct(id: string): void {
    this.productService.get(id).subscribe(
      (data) => {
        this.currentProduct = data.products[0];
        console.log(data);
        // this.productForm.get('category')?.setValue(this.currentProduct?.category,  {onlySelf: true})

        // this.productForm.patchValue({
        //   category: this.currentProduct?.category?.id,
        // });

        this.productForm.controls['category'].setValue(
          this.currentProduct?.category?.id,
          { onlySelf: true }
        );
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updatePublished(): void {
    if (!this.productForm.valid) {
      return;
    }

    const data = {
      id: this.currentProduct?.id,
      name: this.productForm.get('name')?.value,
      categoryId: this.productForm.get('category')?.value,
    };
    console.log(0, data);

    this.productService.update(data).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(['']);
      },
      (error) => {
        this.showError = true;
        this.errorMessage = error.error.message;
      }
    );
  }
}
