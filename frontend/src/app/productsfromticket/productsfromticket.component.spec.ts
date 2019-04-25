import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsfromticketComponent } from './productsfromticket.component';

describe('ProductsfromticketComponent', () => {
  let component: ProductsfromticketComponent;
  let fixture: ComponentFixture<ProductsfromticketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsfromticketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsfromticketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
