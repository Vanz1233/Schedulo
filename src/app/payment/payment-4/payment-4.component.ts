import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-payment-4',
  templateUrl: './payment-4.component.html',
  styleUrls: ['./payment-4.component.css']
})
export class Payment4Component implements OnInit {
  ticketType: string = '';
  section: string = '';
  quantity: number = 0;
  seats: string[] = [];
  totalPrice: number = 0;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    // Retrieve the payment info passed from Payment 3
    const state = history.state;
    if (state) {
      this.ticketType = state.ticketType;
      this.section = state.section;
      this.quantity = state.quantity;
      this.seats = state.seats;
      this.totalPrice = state.totalPrice;
    }
    
    this.sendEmail(); // Send email once the payment info is displayed
  }

  sendEmail(): void {
    // Prepare email data
    const emailData = {
      userEmail: 'vancetindoc@gmail.com',  // Always send email to this address in development
      ticketType: this.ticketType,
      section: this.section,
      quantity: this.quantity,
      seats: this.seats,
      totalPrice: this.totalPrice
    };
  
    // Send the email request to the backend
    this.http.post('http://localhost:3000/api/payment/send-ticket-email', emailData).subscribe(
      (response: any) => {
        console.log('Email sent successfully:', response);
        // Navigate to the homepage after email is sent
        this.router.navigate(['/']);
      },
      (error) => {
        console.error('Error sending email:', error);
        // Consider adding user feedback here (e.g., alert or a message in the UI)
      }
    );
  }
}








