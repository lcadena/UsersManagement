import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TiendasuserComponent } from './tiendasuser.component';

describe('TiendasuserComponent', () => {
  let component: TiendasuserComponent;
  let fixture: ComponentFixture<TiendasuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TiendasuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TiendasuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
