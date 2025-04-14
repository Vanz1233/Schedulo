import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-homepage',
  standalone: false,
  templateUrl: './event-homepage.component.html',
  styleUrl: './event-homepage.component.css'
})
export class EventHomepageComponent {

  constructor(private router: Router) { }
  
  goToAnalyticsReport() {
    this.router.navigate(['/analytics-report']);
  }

}
