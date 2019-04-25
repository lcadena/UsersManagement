import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsuserComponent } from './productsuser.component';

describe('ProductsuserComponent', () => {
  let component: ProductsuserComponent;
  let fixture: ComponentFixture<ProductsuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
