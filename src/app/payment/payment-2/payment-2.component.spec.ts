import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Payment2Component } from './payment-2.component';

describe('Payment2Component', () => {
  let component: Payment2Component;
  let fixture: ComponentFixture<Payment2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Payment2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Payment2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
