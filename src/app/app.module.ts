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
import { TicketPageComponent } from './Event-organiser/ticket-page/ticket-page.component';
import { SelectSectionComponent } from './attendees/select-section/select-section.component';
import { B1Component } from './attendees/b1/b1.component';
import { B2Component } from './attendees/b2/b2.component';
import { B3Component } from './attendees/b3/b3.component';
import { Lf1Component } from './attendees/lf1/lf1.component';
import { Lf2Component } from './attendees/lf2/lf2.component';
import { Lf3Component } from './attendees/lf3/lf3.component';

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
    TicketPageComponent,
    SelectSectionComponent,
    B1Component,
    B2Component,
    B3Component,
    Lf1Component,
    Lf2Component,
    Lf3Component
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
