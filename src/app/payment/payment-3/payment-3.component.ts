import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-payment-3',
    templateUrl: './payment-3.component.html',
    styleUrls: ['./payment-3.component.css'],
    standalone: false
})
export class Payment3Component implements OnInit {
  // Define properties that will be passed from previous components
  ticketType: string = '';
  section: string = '';
  quantity: number = 0;
  seats: string[] = [];
  totalPrice: number = 0;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const state = history.state;
    if (state) {
      // Assign state values to the component properties
      this.ticketType = state.ticketType;
      this.section = state.section;
      this.quantity = state.quantity;
      this.seats = state.seats;
      this.totalPrice = state.totalPrice; // Receive totalPrice from previous components
      console.log(this.ticketType, this.section, this.quantity, this.seats, this.totalPrice); // Log to verify the data
    }
  }

  goToPayment4(): void {
    this.router.navigate(['/payment-4'], {
      state: {
        ticketType: this.ticketType,
        section: this.section,
        quantity: this.quantity,
        seats: this.seats,
        totalPrice: this.totalPrice,
      },
    });
  }
}



