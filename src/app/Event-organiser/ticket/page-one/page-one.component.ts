import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-one',
  templateUrl: './page-one.component.html',
  styleUrls: ['./page-one.component.css']
})
export class PageOneComponent {
  tickets: any[] = [];

  maxSeats = 742;

  constructor(private router: Router) {}

  getTotalTickets(): number {
    return this.tickets.reduce((sum, ticket) => sum + (ticket.maxTickets || 0), 0);
  }

  submitForm() {
    if (this.getTotalTickets() !== this.maxSeats) {
      alert('❌ The total number of tickets must equal to 742 seats in the venue.');
      return;
    }

    console.log("Ticket Types:", this.tickets); // ✅ Debugging log

    // Save ticket data & navigate to seating selection
    this.router.navigate(['/seating'], { state: { tickets: this.tickets } });
  }

  addTicket() {
    if (this.tickets.length < 6) {
      this.tickets.push({ type: '', price: 0, maxTickets: 1, restrictions: '' });
    }
  }

  removeTicket(index: number) {
    if (this.tickets.length > 1) {
      this.tickets.splice(index, 1);
    }
  }

  clearForm() {
    this.tickets = [{ type: '', price: 0, maxTickets: 1, restrictions: '' }];
  }
}










