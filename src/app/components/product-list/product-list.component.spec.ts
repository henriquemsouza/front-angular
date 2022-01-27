import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListComponent } from './product-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductService } from 'src/app/services/product.service';
import { of } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';
import { By } from '@angular/platform-browser';
import { ProductsMock } from 'src/test/mocks/product.mock';
import { CategoriesMock } from 'src/test/mocks/category.mock';

describe('#ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let productServicesMock;
  let categoryServiceMock;


  const products = ProductsMock;

  const createMocks = () => {
    productServicesMock = TestBed.inject(ProductService);
    spyOn(productServicesMock, 'getAll').and.returnValue(of(products));

    categoryServiceMock = TestBed.inject(CategoryService);
    spyOn(categoryServiceMock, 'getAll').and.returnValue(of(CategoriesMock));
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        RouterTestingModule,
        FormsModule,
      ],
      declarations: [ProductListComponent],
    }).compileComponents();

    createMocks();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render search button', () => {
    const btn = fixture.nativeElement.querySelector('.btn-search');

    expect(btn.textContent).toContain('Search');
  });

  it('should render Product list', () => {
    const productsList =
      fixture.nativeElement.querySelector('.products-list-div');
    const listedItems = fixture.debugElement.queryAll(
      By.css('.list-group-item')
    );


    expect(productsList.textContent).toContain('Products List');
    expect(listedItems.length).toBe(2);

    expect(productsList.textContent).toContain(products.products[0].code);
  });
});
