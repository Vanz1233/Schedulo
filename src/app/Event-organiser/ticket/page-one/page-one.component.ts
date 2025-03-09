import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-page-one',
  templateUrl: './page-one.component.html',
  styleUrls: ['./page-one.component.css']
})
export class PageOneComponent {
  tickets: any[] = [{ type: '', price: 0, maxTickets: 1, restrictions: '' }];
  maxSeats = 742;

  constructor(private router: Router, private http: HttpClient) {}

  getTotalTickets(): number {
    return this.tickets.reduce((sum, ticket) => sum + (ticket.maxTickets ? ticket.maxTickets : 0), 0);
  }

  submitForm() {
    if (this.getTotalTickets() !== this.maxSeats) {
      alert('❌ The total number of tickets must equal 742 seats in the venue.');
      return;
    }

    console.log("✅ Ticket Types:", this.tickets);

    // ✅ Send ticket data to the backend
    this.http.post('http://localhost:3000/api/tickets', { tickets: this.tickets }).subscribe({
      next: (response) => {
        console.log('✅ Tickets saved:', response);
        alert('🎟️ Tickets successfully submitted!');
        this.router.navigate(['/seating'], { state: { tickets: this.tickets } });
      },
      error: (error) => {
        console.error('❌ Error posting tickets:', error);
        alert('Failed to submit tickets.');
      }
    });
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










