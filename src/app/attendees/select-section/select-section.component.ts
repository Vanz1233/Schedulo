import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-section',
  templateUrl: './select-section.component.html',
  styleUrls: ['../../../assets/css/select-section.css']
})
export class SelectSectionComponent {
  selectedSection: string | null = null;  // Holds the selected section

  constructor(private router: Router) {}

  selectSection(section: string): void {
    this.selectedSection = section;
  }

  proceed(): void {
    if (this.selectedSection) {
      this.router.navigate([`/sections/${this.selectedSection}`]); // Navigate to the selected section page
    } else {
      alert("Please select a section before proceeding.");
    }
  }
}

