import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment-1',
  templateUrl: './payment-1.component.html',
  styleUrl: './payment-1.component.css'
})
export class Payment1Component implements OnInit {
  section: string | null = null;
  seats: string[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.section = params['section']; // Get section
      this.seats = params['seats'] ? JSON.parse(params['seats']) : []; // Parse seat array
    });
  }

}
