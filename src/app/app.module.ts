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
import { PageOneComponent } from './Event-organiser/ticket/page-one/page-one.component';
import { PasswordComponent } from './password/password.component';
import { SeatingComponent } from './Event-organiser/ticket/seating/seating.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    LoginComponent,
    CreateEventOrganiserComponent,
    SignupComponent,
    RegisteredEventOrganisersComponent,
    PageOneComponent,
    PasswordComponent,
    SeatingComponent
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
