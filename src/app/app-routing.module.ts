import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login-signup/login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AuthGuard } from './auth.guard';
import { PasswordComponent } from './password/password.component';  
import { CreateEventOrganiserComponent } from './Admin/create-event-organiser/create-event-organiser.component';
import { AdminHomepageComponent } from './Admin/admin-homepage/admin-homepage.component';
import { RegisteredEventOrganisersComponent } from './Admin/registered-event-organisers/registered-event-organisers.component';
import { TicketPageComponent } from './Event-organiser/ticket-page/ticket-page.component';
import { SelectSectionComponent } from './attendees/select-section/select-section.component';
import { B1Component } from './attendees/b1/b1.component';
import { B2Component } from './attendees/b2/b2.component';
import { B3Component } from './attendees/b3/b3.component';
import { Lf1Component } from './attendees/lf1/lf1.component';
import { Lf2Component } from './attendees/lf2/lf2.component';
import { Lf3Component } from './attendees/lf3/lf3.component';
import { Payment1Component } from './payment/payment-1/payment-1.component';
import { Payment2Component } from './payment/payment-2/payment-2.component';
import { Payment3Component } from './payment/payment-3/payment-3.component';
import { Payment4Component } from './payment/payment-4/payment-4.component';
import { AnalyticsReportComponent } from './analytics-report/analytics-report.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent },
  {path: 'signup', component: SignupComponent },
  {path: 'homepage', component: HomepageComponent, canActivate: [AuthGuard] },
  {path: 'password', component: PasswordComponent},
  {path: 'create-event-organiser', component: CreateEventOrganiserComponent},
  {path: 'admin-homepage', component: AdminHomepageComponent},  
  {path: 'registered-event-organisers', component: RegisteredEventOrganisersComponent},
  {path: 'ticket-page', component: TicketPageComponent},
  {path: 'select-section', component: SelectSectionComponent},
  {path: 'b1', component: B1Component},
  {path: 'b2', component: B2Component},
  {path: 'b3', component: B3Component},
  {path : 'lf1', component: Lf1Component},
  {path : 'lf2', component: Lf2Component},
  {path : 'lf3', component: Lf3Component},
  {path : 'payment-1', component: Payment1Component},
  {path : 'payment-2', component: Payment2Component},
  {path : 'payment-3', component: Payment3Component},
  {path : 'payment-4', component: Payment4Component},
  {path: 'analytics-report', component: AnalyticsReportComponent},
  {path: '', redirectTo: 'select-section', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


