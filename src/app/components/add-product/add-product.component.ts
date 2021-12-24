import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

import { CategoryService } from 'src/app/services/category.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  product = {
    name: '',
    code: null,
    published: false,
    category: null,
  };
  submitted = false;
  showError = false;
  errorMessage = '';
  categories = null;

  productForm!: FormGroup;
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initFormBuilder();

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

  saveProduct(): void {
    const data = {
      name: this.product.name,
      code: this.product.code,
      categoryId: this.product.category,
    };

    if (!this.productForm.valid) {
      return;
    }

    this.productService.create(data).subscribe(
      (response) => {
        console.log(response);
        this.submitted = true;

        this.router.navigate(['']);
      },
      (error) => {
        this.showError = true;
        this.errorMessage = error.error.message;
        console.log(error);
      }
    );
  }
}
