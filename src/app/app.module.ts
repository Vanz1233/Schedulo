import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login-signup/login/login.component';
import { CreateEventOrganiserComponent } from './Admin/create-event-organiser/create-event-organiser.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegisteredEventOrganisersComponent } from './Admin/registered-event-organisers/registered-event-organisers.component';
import { PasswordComponent } from './password/password.component';
import { AdminHomepageComponent } from './Admin/admin-homepage/admin-homepage.component';
import { TicketBookingComponent } from './Attendees/ticket-booking/ticket-booking.component';
import { TicketPageComponent } from './Event-organiser/ticket-page/ticket-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    LoginComponent,
    CreateEventOrganiserComponent,
    SignupComponent,
    RegisteredEventOrganisersComponent,
    PasswordComponent,
    AdminHomepageComponent,
    TicketBookingComponent,
    TicketPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
