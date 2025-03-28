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

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'homepage', component: HomepageComponent, canActivate: [AuthGuard] },
  {path: 'password', component: PasswordComponent},
  {path: 'create-event-organiser', component: CreateEventOrganiserComponent},
  {path: 'admin-homepage', component: AdminHomepageComponent},  
  {path: 'registered-event-organisers', component: RegisteredEventOrganisersComponent},
  { path: '', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


