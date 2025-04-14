import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
    selector: 'app-payment-1',
    templateUrl: './payment-1.component.html',
    styleUrls: ['./payment-1.component.css'],
    standalone: false
})
export class Payment1Component implements OnInit {
  section: string | null = null; // Section name (e.g., "B1")
  seats: string[] = []; // Selected seats array
  ticketData: any = {}; // Holds fetched ticket details
  totalPrice: number = 0; // Calculated total price
  discountedPrice: number = 0; // Discounted price for one ticket

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    // Fetch query parameters (section and seats)
    this.route.queryParams.subscribe((params) => {
      this.section = params['section']; // Get the section (e.g., "B1")
      this.seats = params['seats'] ? JSON.parse(params['seats']) : []; // Parse seat array

      console.log('Section:', this.section); // Debugging
      console.log('Seats:', this.seats); // Debugging

      if (this.section) {
        this.fetchTicketDetails(this.section); // Fetch ticket details for the section
      }
    });
  }

  fetchTicketDetails(section: string): void {
    const uppercaseSection = section.toUpperCase(); // Convert section to uppercase

    console.log('Fetching ticket details for section:', uppercaseSection); // Debugging

    this.http.get(`http://localhost:3000/api/tickets/section/${uppercaseSection}`).subscribe(
      (response: any) => {
        console.log('API Response:', response); // Debugging
        this.ticketData = response; // Store ticket data
        console.log('Stored Ticket Data:', this.ticketData); // Debugging

        let discountPercentage = 0;
        if (this.ticketData.promoCode === "DISCOUNT20") {
            discountPercentage = 0.20;
        } else if (this.ticketData.promoCode === "DISCOUNT10") {
            discountPercentage = 0.10;
        }

        this.discountedPrice = this.ticketData.price * (1 - discountPercentage);
        console.log('Discounted Price:', this.discountedPrice); // Debugging

        // Calculate total price based on the number of seats
        if (this.discountedPrice && this.seats.length > 0) {
          this.totalPrice = this.discountedPrice * this.seats.length;
          console.log('Total Price:', this.totalPrice); // Debugging
        } else {
            this.totalPrice = 0; // Ensure total price is 0 if conditions aren't met
        }
      },
      (error) => {
        console.error('Error fetching ticket details:', error);
        alert('Failed to fetch ticket details. Please try again.');
      }
    );
  }

  goToPayment2(): void {
    console.log('Navigating to Payment-2 with state:', {
      ticketType: this.ticketData.type,
      section: this.section,
      quantity: this.seats.length,
      seats: this.seats,
      totalPrice: this.totalPrice,
    }); // Debugging

    this.router.navigate(['/payment-2'], {
      state: {
        ticketType: this.ticketData.type,
        section: this.section,
        quantity: this.seats.length,
        seats: this.seats,
        totalPrice: this.totalPrice,
      },
    });
  }
}







