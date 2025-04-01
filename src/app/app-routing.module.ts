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

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'homepage', component: HomepageComponent, canActivate: [AuthGuard] },
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
  { path: '', redirectTo: 'b3', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


