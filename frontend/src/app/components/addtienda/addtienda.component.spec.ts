import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtiendaComponent } from './addtienda.component';

describe('AddtiendaComponent', () => {
  let component: AddtiendaComponent;
  let fixture: ComponentFixture<AddtiendaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddtiendaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddtiendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
