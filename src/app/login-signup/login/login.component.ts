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
      email: ['', [Validators.required, Validators.email]], // ✅ Using email instead of username
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.http.post<{ token: string; role: string }>('http://localhost:3000/api/auth/login', this.loginForm.value)
        .subscribe({
          next: (response) => {
            if (response?.token) {
              this.authService.setToken(response.token); // Store token

              // Redirect based on role
              if (response.role === 'admin') {
                alert('Login succesful!');
                this.router.navigate(['/admin-homepage']);
              } else if (response.role === 'event-organiser') {
                alert('Login Successful!');
                this.router.navigate(['/event-organiser-homepage']);
              } else {
                this.errorMessage = 'Unkown Schedulo Role.';
              }
            } else {
              this.errorMessage = 'Invalid response from server. Please try again.';
            }
          },
          error: (err) => {
            console.error('Login error:', err);
            this.errorMessage = err.error?.message || 'Login failed. Please try again.';
          }
        });
    } else {
      this.errorMessage = 'Please enter a valid email and password.';
    }
  }

  getErrorMessage(field: string): string {
    const control = this.loginForm.get(field);
    if (control?.hasError('required')) return `${field} is required`;
    if (field === 'email' && control?.hasError('email')) return 'Invalid email format';
    if (field === 'password' && control?.hasError('minlength')) return 'Password must be at least 6 characters';
    return '';
  }
}






