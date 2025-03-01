import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;
  isSubmitting = false; // Prevent multiple submissions

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.signupForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^(\\+\\d{1,3})?\\d{10,15}$')]],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.signupForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      const formData = this.signupForm.value;

      this.http.post('http://localhost:3000/api/signup', formData).subscribe(
        response => {
          console.log('User registered successfully:', response);
          alert('Signup successful!');
          this.signupForm.reset(); // Reset form after success
        },
        error => {
          console.error('Signup failed:', error);
          alert('Signup failed. Please try again.');
        }
      ).add(() => this.isSubmitting = false); // Reset button state after request
    } else {
      alert('Please fill in all required fields correctly.');
    }
  }
}



