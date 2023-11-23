import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderConirmationComponent } from './order-conirmation.component';

describe('OrderConirmationComponent', () => {
  let component: OrderConirmationComponent;
  let fixture: ComponentFixture<OrderConirmationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderConirmationComponent]
    });
    fixture = TestBed.createComponent(OrderConirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
