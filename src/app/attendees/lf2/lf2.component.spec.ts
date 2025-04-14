import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Lf2Component } from './lf2.component';

describe('Lf2Component', () => {
  let component: Lf2Component;
  let fixture: ComponentFixture<Lf2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Lf2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Lf2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
