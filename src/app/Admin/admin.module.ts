import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateEventOrganiserComponent } from './create-event-organiser/create-event-organiser.component';
import { AnalyticsReportComponent } from './analytics-report/analytics-report.component';
import { RegisteredEventOrganisersComponent } from './registered-event-organisers/registered-event-organisers.component';



@NgModule({
  declarations: [
    CreateEventOrganiserComponent,
    AnalyticsReportComponent,
    RegisteredEventOrganisersComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AdminModule { }
