import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewEventDetailsComponent } from './view-event-details/view-event-details.component';
import { TicketBookingComponent } from './ticket-booking/ticket-booking.component';



@NgModule({
  declarations: [
    ViewEventDetailsComponent,
    TicketBookingComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AttendeesModule { }
