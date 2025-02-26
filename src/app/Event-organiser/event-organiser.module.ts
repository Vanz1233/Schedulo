import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventCreationComponent } from './event-creation/event-creation.component';
import { ViewEventDetailsComponent } from './view-event-details/view-event-details.component';



@NgModule({
  declarations: [
    EventCreationComponent,
    ViewEventDetailsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class EventOrganiserModule { }
