import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-event-organiser',
  templateUrl: './create-event-organiser.component.html',
  styleUrls: ['./create-event-organiser.component.css']
})
export class CreateEventOrganiserComponent {
  organizer = {
    organizerName: '',
    fullName: '',
    email: '',
    phone: '',
    username: '',
    password: ''
  };

  constructor(private http: HttpClient) {}

  registerOrganizer() {
    this.http.post('http://localhost:3000/api/register-organizer', this.organizer)
      .subscribe(response => {
        console.log('Organizer registered:', response);
        alert('Organizer successfully registered!');
      }, error => {
        console.error('Error registering organizer:', error);
        alert('Failed to register organizer.');
      });
  }
}

