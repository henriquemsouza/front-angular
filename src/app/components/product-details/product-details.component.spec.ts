import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailsComponent } from './product-details.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CategoryService } from 'src/app/services/category.service';
import { CategoriesMock } from 'src/test/mocks/category.mock';
import { of } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { ProductsMock } from 'src/test/mocks/product.mock';

describe('#ProductDetailsComponent', () => {
  let component: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;
  let categoryServiceMock;
  let productServicesMock;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        RouterTestingModule,
      ],
      declarations: [ProductDetailsComponent],
    }).compileComponents();

    categoryServiceMock = TestBed.inject(CategoryService);
    spyOn(categoryServiceMock, 'getAll').and.returnValue(of(CategoriesMock));

    productServicesMock = TestBed.inject(ProductService);
    spyOn(productServicesMock, 'get').and.returnValue(of(ProductsMock));

    fixture = TestBed.createComponent(ProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show item details', () => {
    const form = component.productForm;

    const product = ProductsMock.products[0];

    expect(form.get('name')?.value).toBe(product.name);
    expect(form.get('code')?.value).toBe(product.code);
  });
});
