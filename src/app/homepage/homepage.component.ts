import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  isLoggedIn: boolean = false;
  events = [
    { title: "Event 1", description: "Event 1 details..." },
    { title: "Event 2", description: "Event 2 details..." },
    { title: "Event 3", description: "Event 3 details..." },
    { title: "Event 4", description: "Event 4 details..." }
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    // Check if user is logged in (based on token in localStorage)
    this.isLoggedIn = !!localStorage.getItem('token');
  }

  goToLogin(): void {
    this.router.navigate(['login']);
  }

  logout() {
    localStorage.removeItem('token'); // Clear token
    this.isLoggedIn = false;
    this.router.navigate(['/login']); // Redirect to login
  }
}

