import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ticket-page',
  templateUrl: './ticket-page.component.html',
  styleUrls: ['./ticket-page.component.css']
})
export class TicketPageComponent {
  eventTitle: string = "Event Title";
  eventDateTime: string = "Date & Time";

  sections: string[] = ["LF3", "LF2", "LF1", "B3", "B2", "B1"];
  selectedSection: string | null = null;

  tickets: { section: string; type: string; price: number }[] = [{ section: '', type: '', price: 0 }];

  promoCode: string = ""; // ✅ Separate from tickets
  discount: number = 0; // ✅ Global discount percentage

  constructor(private http: HttpClient) {}

  selectSection(section: string) {
    this.selectedSection = this.selectedSection === section ? null : section;
    if (this.tickets.length > 0) {
      this.tickets[this.tickets.length - 1].section = section;
    }
  }

  addTicket() {
    this.tickets.push({ section: this.selectedSection || '', type: '', price: 0 });
  }

  removeTicket(index: number) {
    this.tickets.splice(index, 1);
  }

  clearForm() {
    this.tickets = [{ section: '', type: '', price: 0 }];
    this.selectedSection = null;
    this.promoCode = "";
    this.discount = 0;
  }

  applyPromoCode() {
    if (this.promoCode === "DISCOUNT10") {
      this.discount = 10;
    } else if (this.promoCode === "DISCOUNT20") {
      this.discount = 20;
    } else {
      this.discount = 0;
      alert("Invalid promo code.");
    }
  }

  submitForm() {
    // ✅ Convert price to a number
    this.tickets.forEach(ticket => {
      ticket.price = Number(ticket.price);
    });

    // ✅ Validate input before submitting
    if (this.tickets.some(ticket => !ticket.section || !ticket.type || isNaN(ticket.price) || ticket.price <= 0)) {
      alert("Please fill in all ticket details with valid prices.");
      return;
    }

    const ticketData = {
      eventTitle: this.eventTitle,
      eventDateTime: this.eventDateTime,
      tickets: this.tickets,
      promoCode: this.promoCode,
      discount: this.discount,
    };

    this.http.post('http://localhost:3000/api/tickets', ticketData).subscribe(
      response => {
        console.log("✅ Ticket Submission Response:", response);
        alert("Tickets submitted successfully!");
        this.clearForm();
      },
      error => {
        console.error("❌ Ticket Submission Error:", error);
        alert("Failed to submit tickets. Please try again.");
      }
    );
  }
}





