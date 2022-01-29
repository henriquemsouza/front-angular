import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductComponent } from './add-product.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { CategoryService } from 'src/app/services/category.service';
import { CategoriesMock } from 'src/test/mocks/category.mock';

describe('#AddProductComponent', () => {
  let component: AddProductComponent;
  let fixture: ComponentFixture<AddProductComponent>;
  let categoryServiceMock;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        RouterTestingModule,
      ],
      declarations: [AddProductComponent],
      providers: [],
    }).compileComponents();

    categoryServiceMock = TestBed.inject(CategoryService);
    spyOn(categoryServiceMock, 'getAll').and.returnValue(of(CategoriesMock));

    fixture = TestBed.createComponent(AddProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render form correctly', () => {
    const form = fixture.nativeElement.querySelector('#add-product-form');

    const inputs = form.querySelectorAll('input');
    const select = form.querySelectorAll('select');

    expect(inputs.length).toBe(2);
    expect(select.length).toBe(1);
  });

  it('should check initial value', () => {
    const form = component.productForm;

    const initialValues = { name: '', code: '', category: '' };

    expect(form.value).toEqual(initialValues);
  });

  it('should check if name is valid', () => {
    const formNameElement = fixture.debugElement.nativeElement
      .querySelector('#add-product-form')
      .querySelectorAll('input')[0];

    formNameElement.value = 'Valid_name';
    component.productForm.get('name')?.setValue('Valid_name');

    formNameElement.dispatchEvent(new Event('input'));

    const isValid = component.productForm.get('name')?.valid;

    expect(isValid).toBe(true);
  });

  it('should check if name is not valid', () => {
    const formNameElement = fixture.debugElement.nativeElement
      .querySelector('#add-product-form')
      .querySelectorAll('input')[0];

    formNameElement.value = null;
    formNameElement.dispatchEvent(new Event('input'));

    const isValid = component.productForm.get('name')?.valid;

    expect(isValid).toBeFalsy();
  });
});
