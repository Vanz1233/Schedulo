import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-page-one',
  templateUrl: './page-one.component.html',
  styleUrls: ['./page-one.component.css']
})
export class PageOneComponent {
  tickets = [
    { type: '', price: null },
    { type: '', price: null },
    { type: '', price: null },
    { type: '', price: null },
    { type: '', price: null },
    { type: '', price: null }
  ];
  
  promotionCode: string = '';
  discountPercentage: number | null = null;
  applicableTicketType: string = '';

  constructor(private http: HttpClient) {}

  submitForm() {  // ✅ Add this function
    this.onSubmit();
  }

  onSubmit() {
    const ticketData = {
      eventTitle: 'Sample Event',
      eventDateTime: new Date(),
      ticketTypes: this.tickets.map(t => t.type),
      prices: this.tickets.map(t => t.price),
      promotionCode: this.promotionCode,
      discountPercentage: this.discountPercentage,
      applicableTicketType: this.applicableTicketType
    };

    this.http.post('http://localhost:3000/api/tickets', ticketData)
      .subscribe(response => {
        console.log('Ticket Created:', response);
      }, error => {
        console.error('Error:', error);
      });
  }

  clearForm() {
    this.tickets.forEach(ticket => {
      ticket.type = '';
      ticket.price = null;
    });
    this.promotionCode = '';
    this.discountPercentage = null;
    this.applicableTicketType = '';
  }
}


