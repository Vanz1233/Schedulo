import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateEventOrganiserComponent } from './create-event-organiser/create-event-organiser.component';
import { AnalyticsReportComponent } from './analytics-report/analytics-report.component';
import { RegisteredEventOrganisersComponent } from './registered-event-organisers/registered-event-organisers.component';
import { AdminHomepageComponent } from './admin-homepage/admin-homepage.component';



@NgModule({
  declarations: [
    CreateEventOrganiserComponent,
    AnalyticsReportComponent,
    RegisteredEventOrganisersComponent,
    AdminHomepageComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AdminModule { }
