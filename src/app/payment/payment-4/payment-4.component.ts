import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-payment-4',
  templateUrl: './payment-4.component.html',
  styleUrls: ['./payment-4.component.css'],
  standalone: false
})
export class Payment4Component implements OnInit {
  ticketType: string = '';
  section: string = '';
  quantity: number = 0;
  seats: string[] = [];
  totalPrice: number = 0;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const state = history.state;
    if (state) {
      this.ticketType = state.ticketType;
      this.section = state.section;
      this.quantity = state.quantity;
      this.seats = state.seats;
      this.totalPrice = state.totalPrice;
    }

    this.sendEmail();
    this.saveChartData(); // Save data for chart analytics
  }

  sendEmail(): void {
    const emailData = {
      userEmail: 'vancetindoc@gmail.com',
      ticketType: this.ticketType,
      section: this.section,
      quantity: this.quantity,
      seats: this.seats,
      totalPrice: this.totalPrice
    };

    this.http.post('http://localhost:3000/api/payment/send-ticket-email', emailData).subscribe(
      (response: any) => {
        console.log('Email sent successfully:', response);
        // Navigate to the homepage after email is sent
        this.router.navigate(['/']);
      },
      (error) => {
        console.error('Error sending email:', error);
      }
    );
  }

  saveChartData(): void {
    const chartData = {
      ticketType: this.ticketType,
      section: this.section,
      quantity: this.quantity,
      seats: this.seats,
      totalPrice: this.totalPrice
    };

    this.http.post('http://localhost:3000/api/data-charts/save', chartData).subscribe(
      (response: any) => {
        console.log('Chart data saved successfully:', response);
      },
      (error) => {
        console.error('Error saving chart data:', error);
      }
    );
  }
}










