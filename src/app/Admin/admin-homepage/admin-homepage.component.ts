import { Component } from '@angular/core';
import { Router } from '@angular/router'; // ✅ Import Router

@Component({
  selector: 'app-admin-homepage',
  templateUrl: './admin-homepage.component.html',
  styleUrl: './admin-homepage.component.css'
})
export class AdminHomepageComponent {
constructor(private router: Router) {} // ✅ Inject Router

  goToRegisterEventOrganiser() {
    this.router.navigate(['/registered-event-organisers']); // ✅ Public method to navigate
  }

}
