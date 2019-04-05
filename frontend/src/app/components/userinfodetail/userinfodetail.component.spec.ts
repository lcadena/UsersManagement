import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserinfodetailComponent } from './userinfodetail.component';

describe('UserinfodetailComponent', () => {
  let component: UserinfodetailComponent;
  let fixture: ComponentFixture<UserinfodetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserinfodetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserinfodetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
