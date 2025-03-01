import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service'; // Import AuthService

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService // Inject AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onLogin() { // Function to handle login form submission
    if (this.loginForm.valid) {
      this.http.post<any>('http://localhost:3000/api/login', this.loginForm.value)
        .subscribe({
          next: (response) => {
            console.log('Login successful:', response);
            this.authService.setToken(response.token); // Store token using AuthService
            alert('Login successful! Redirecting to homepage...');
            this.router.navigate(['/home']); // Redirect to homepage
          },
          error: (err) => {
            this.errorMessage = err.error?.error || 'Login failed. Please try again.';
          }
        });
    } else {
      this.errorMessage = 'Please fill out the form correctly before submitting.';
    }
  }

  getErrorMessage(field: string): string {
    const control = this.loginForm.get(field);
  
    if (control?.hasError('required')) {
      return 'This field is required';
    }
  
    if (control?.hasError('email')) {
      return 'Please enter a valid email address';
    }
  
    return '';
  }
  
}




