import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTitleComponent } from './form-title.component';

describe('#FormTitleComponent', () => {
  let component: FormTitleComponent;
  let fixture: ComponentFixture<FormTitleComponent>;
  const titleMock = 'mock title';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormTitleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FormTitleComponent);
    component = fixture.componentInstance;
    component.title = titleMock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render button', () => {
    const btn = fixture.nativeElement.querySelector('.btn');

    expect(btn.textContent).toContain('Back');
  });

  it('should render title', () => {
    const title = fixture.nativeElement.querySelector('h4');

    expect(title.textContent).toContain(titleMock);
  });

  it('should check if button is disable', () => {
    const btn = fixture.nativeElement.querySelector('.btn');

    expect(btn.disabled).toBe(true)
  });

});
