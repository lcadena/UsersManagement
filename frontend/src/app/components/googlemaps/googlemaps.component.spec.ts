import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GooglemapsComponent } from './googlemaps.component';

describe('GooglemapsComponent', () => {
  let component: GooglemapsComponent;
  let fixture: ComponentFixture<GooglemapsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GooglemapsComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GooglemapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
