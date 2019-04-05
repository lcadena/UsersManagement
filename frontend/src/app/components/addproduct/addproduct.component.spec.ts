import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddproductComponent } from './addproduct.component';

describe('MenuComponent', () => {
  let component: AddproductComponent;
  let fixture: ComponentFixture<AddproductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddproductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
