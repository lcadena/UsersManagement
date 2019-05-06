import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddticketComponent } from './addticket.component';

describe('AddticketComponent', () => {
  let component: AddticketComponent;
  let fixture: ComponentFixture<AddticketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddticketComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddticketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
