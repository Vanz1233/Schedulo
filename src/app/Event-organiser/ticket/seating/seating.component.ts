import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-seating',
  templateUrl: './seating.component.html',
  styleUrls: ['./seating.component.css']
})
export class SeatingComponent implements OnInit {
  tickets: any[] = [];
  seatingAssignments: { [key: string]: string } = {}; 
  selectedSection: string | null = null;
  eventTitle: string = "Untitled Event"; // 🔹 Set dynamically from storage

  constructor(private router: Router, private http: HttpClient) {
    const nav = this.router.getCurrentNavigation();
    if (nav?.extras.state?.['tickets']) {
      this.tickets = nav.extras.state['tickets']; 
      console.log("✅ Ticket Types from Navigation:", this.tickets);
    }
  }

  ngOnInit() {
    if (this.tickets.length === 0) {
      const storedData = sessionStorage.getItem('ticketData');
      if (storedData) {
        const ticketData = JSON.parse(storedData);
        this.tickets = ticketData.ticketTypes || [];
        this.eventTitle = ticketData.eventTitle || "Untitled Event"; // ✅ Set event title dynamically
        console.log("✅ Ticket Types from Session Storage:", this.tickets);
      }
    }
  }

  selectSection(section: string) {
    this.selectedSection = section;
  }

  assignTicketToSection(ticketType: string, section: string) {
    if (section) {
      this.seatingAssignments[ticketType] = section;
      console.log(`✅ Assigned ${ticketType} to ${section}`);
    }
  }

  confirmSeating() {
    if (Object.keys(this.seatingAssignments).length === 0) {
      alert("❌ Please assign at least one ticket type to a section.");
      return;
    }

    console.log("🏟️ Final Seating Assignments:", this.seatingAssignments);

    // ✅ Send seating assignments to the backend
    this.http.post('http://localhost:3000/api/tickets/seating', { 
      eventTitle: this.eventTitle, 
      seatingAssignments: this.seatingAssignments 
    }).subscribe({
      next: (response) => {
        console.log("✅ Seating assignments saved:", response);
        alert("✅ Seating assignments saved successfully!");

        // ✅ Store assignments in sessionStorage (optional)
        sessionStorage.setItem('seatingAssignments', JSON.stringify(this.seatingAssignments));

        // ✅ Navigate to event summary page
        this.router.navigate(['/event-summary'], { state: { seatingAssignments: this.seatingAssignments } });
      },
      error: (error) => {
        console.error("❌ Error saving seating assignments:", error);
        alert("❌ Failed to save seating assignments.");
      }
    });
  }
}






