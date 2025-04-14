import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventHomepageComponent } from './event-homepage.component';

describe('EventHomepageComponent', () => {
  let component: EventHomepageComponent;
  let fixture: ComponentFixture<EventHomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventHomepageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
