import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;
  errorMessages: any = {
    fullName: "Full Name is required.",
    email: {
      required: "Email is required.",
      email: "Invalid email format (e.g., someone@example.com)."
    },
    phone: {
      required: "Phone number is required.",
      pattern: "Invalid phone number format."
    },
    username: "Username is required.",
    password: {
      required: "Password is required.",
      minlength: "Password must be at least 8 characters long."
    }
  };

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.signupForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^\\+?[0-9]{10,15}$')]],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  getErrorMessage(field: string): string {
    const control = this.signupForm.get(field);
    if (control?.hasError('required')) return this.errorMessages[field].required || this.errorMessages[field];
    if (control?.hasError('email')) return this.errorMessages[field].email;
    if (control?.hasError('pattern')) return this.errorMessages[field].pattern;
    if (control?.hasError('minlength')) return this.errorMessages[field].minlength;
    return "";
  }

  onSubmit() {
    if (this.signupForm.valid) {
      // Send form data to the backend
      this.http.post('http://localhost:3000/api/signup', this.signupForm.value).subscribe(
        response => {
          console.log('User registered successfully:', response);
          alert('Signup successful! Redirecting to login...');
          this.router.navigate(['/login']); // Redirect to login page
        },
        error => {
          console.error('Signup failed:', error);
          alert('Signup failed. Please try again.');
        }
      );
    } else {
      alert('Please fill in all required fields correctly.');
    }
  }
}




