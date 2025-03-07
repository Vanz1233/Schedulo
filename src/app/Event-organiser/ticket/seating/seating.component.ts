import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seating',
  templateUrl: './seating.component.html',
  styleUrls: ['./seating.component.css']
})
export class SeatingComponent implements OnInit {
  tickets: any[] = [];
  seatingAssignments: { [key: string]: string } = {}; 
  selectedSection: string | null = null;

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    if (nav?.extras.state?.['tickets']) {
      this.tickets = nav.extras.state['tickets']; 
      console.log("Ticket Types from Navigation:", this.tickets); // ✅ Debugging navigation state
    }
  }

  ngOnInit() {
    if (this.tickets.length === 0) {
      const storedData = sessionStorage.getItem('ticketData');
      if (storedData) {
        const ticketData = JSON.parse(storedData);
        this.tickets = ticketData.ticketTypes || [];
        console.log("Ticket Types from Session Storage:", this.tickets); // ✅ Debugging session storage
      }
    }
  }

  selectSection(section: string) {
    this.selectedSection = section;
  }

  confirmSeating() {
    if (Object.keys(this.seatingAssignments).length === 0) {
      alert("❌ Please assign at least one ticket type to a section.");
      return;
    }

    console.log("🏟️ Seating Assignments:", this.seatingAssignments);
    sessionStorage.setItem('seatingAssignments', JSON.stringify(this.seatingAssignments)); 
    alert("✅ Seating assignments saved!");

    this.router.navigate(['/event-summary'], { state: { seatingAssignments: this.seatingAssignments } });
  }
}



