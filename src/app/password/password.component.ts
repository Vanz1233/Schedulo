import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-password',
    templateUrl: './password.component.html',
    styleUrls: ['./password.component.css'],
    standalone: false
})
export class PasswordComponent implements OnInit {
  passwordForm: FormGroup;
  email: string = '';

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required], // Required: The generated password
      newPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'] || '';
    });
  }

  changePassword(): void {
    if (this.passwordForm.valid) {
      const formData = {
        email: this.email,
        currentPassword: this.passwordForm.value.currentPassword, // User enters the generated password
        newPassword: this.passwordForm.value.newPassword
      };

      this.http.post('http://localhost:3000/api/change-password', formData).subscribe(
        () => {
          alert('Password changed successfully!');
          this.router.navigate(['/login']); // Redirect to login after update
        },
        error => {
          alert(error.error?.error || 'Error changing password!');
        }
      );
    }
  }
}

