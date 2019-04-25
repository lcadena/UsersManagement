import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyticketComponent } from './modifyticket.component';

describe('ModifyticketComponent', () => {
  let component: ModifyticketComponent;
  let fixture: ComponentFixture<ModifyticketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyticketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyticketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
