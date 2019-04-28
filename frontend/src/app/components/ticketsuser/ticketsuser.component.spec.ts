import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsuserComponent } from './ticketsuser.component';

describe('TicketsuserComponent', () => {
  let component: TicketsuserComponent;
  let fixture: ComponentFixture<TicketsuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketsuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketsuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
