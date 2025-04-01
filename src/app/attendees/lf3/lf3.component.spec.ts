import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Lf3Component } from './lf3.component';

describe('Lf3Component', () => {
  let component: Lf3Component;
  let fixture: ComponentFixture<Lf3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Lf3Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Lf3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
