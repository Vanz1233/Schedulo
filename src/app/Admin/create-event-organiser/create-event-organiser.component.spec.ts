import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEventOrganiserComponent } from './create-event-organiser.component';

describe('CreateEventOrganiserComponent', () => {
  let component: CreateEventOrganiserComponent;
  let fixture: ComponentFixture<CreateEventOrganiserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateEventOrganiserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEventOrganiserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
