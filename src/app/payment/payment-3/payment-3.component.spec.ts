import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Payment3Component } from './payment-3.component';

describe('Payment3Component', () => {
  let component: Payment3Component;
  let fixture: ComponentFixture<Payment3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Payment3Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Payment3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
