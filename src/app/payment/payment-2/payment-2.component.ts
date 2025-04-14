import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-payment-2',
    templateUrl: './payment-2.component.html',
    styleUrl: './payment-2.component.css',
    standalone: false
})
export class Payment2Component implements OnInit {
  // Local variable to hold the data from payment-1
  ticketData: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Fetch data passed from payment-1 using history.state
    const state = history.state;
    this.ticketData = state;

    console.log(this.ticketData); // Debugging data received from payment-1
  }

  // Proceed to payment-3 and pass data
  goToPayment3(): void {
    this.router.navigate(['/payment-3'], {
      state: this.ticketData, // Pass the data from payment-2 to payment-3
    });
  }
}
