import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventCreationComponent } from './event-creation/event-creation.component';
import { ViewEventDetailsComponent } from './view-event-details/view-event-details.component';
import { PageOneComponent } from './ticket/page-one/page-one.component';
import { PageTwoComponent } from './ticket/page-two/page-two.component';
import { PageThreeComponent } from './ticket/page-three/page-three.component';
import { PageFourComponent } from './ticket/page-four/page-four.component';
import { PageFiveComponent } from './ticket/page-five/page-five.component';



@NgModule({
  declarations: [
    EventCreationComponent,
    ViewEventDetailsComponent,
    PageOneComponent,
    PageTwoComponent,
    PageThreeComponent,
    PageFourComponent,
    PageFiveComponent
  ],
  imports: [
    CommonModule
  ]
})
export class EventOrganiserModule { }
