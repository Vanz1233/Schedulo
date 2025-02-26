import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateEventOrganiserComponent } from './create-event-organiser/create-event-organiser.component';
import { AnalyticsReportComponent } from './analytics-report/analytics-report.component';



@NgModule({
  declarations: [
    CreateEventOrganiserComponent,
    AnalyticsReportComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AdminModule { }
