import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredEventOrganisersComponent } from './registered-event-organisers.component';

describe('RegisteredEventOrganisersComponent', () => {
  let component: RegisteredEventOrganisersComponent;
  let fixture: ComponentFixture<RegisteredEventOrganisersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisteredEventOrganisersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisteredEventOrganisersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
