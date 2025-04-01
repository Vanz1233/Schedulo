import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Lf1Component } from './lf1.component';

describe('Lf1Component', () => {
  let component: Lf1Component;
  let fixture: ComponentFixture<Lf1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Lf1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Lf1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
