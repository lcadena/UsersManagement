import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifytiendaComponent } from './modifytienda.component';

describe('ModifytiendaComponent', () => {
  let component: ModifytiendaComponent;
  let fixture: ComponentFixture<ModifytiendaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifytiendaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifytiendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
