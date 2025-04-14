import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; // ✅ Import Router

@Component({
    selector: 'app-create-event-organiser',
    templateUrl: './create-event-organiser.component.html',
    styleUrls: ['./create-event-organiser.component.css'],
    standalone: false
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

  successMessage: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {} // ✅ Inject Router

  registerOrganizer() {
    this.http.post('http://localhost:3000/api/register-organizer', this.organizer)
      .subscribe({
        next: (response) => {
          console.log('Organizer registered successfully:', response);
          this.successMessage = 'Organizer successfully registered! A confirmation email has been sent.';
          this.errorMessage = '';
          alert(this.successMessage);

          // ✅ Redirect to Admin Homepage after successful registration
          this.router.navigate(['/admin-homepage']);
        },
        error: (error) => {
          console.error('Error registering organizer:', error);

          // Handle Duplicate Organizer Error
          if (error.status === 400 && error.error?.error) {
            this.errorMessage = error.error.error; // Display error from the backend
          } else {
            this.errorMessage = 'Failed to register organizer. Please try again.';
          }
          alert(this.errorMessage);
        }
      });
  }
}



