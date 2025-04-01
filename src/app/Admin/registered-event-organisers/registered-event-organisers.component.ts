import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registered-event-organisers',
  templateUrl: './registered-event-organisers.component.html',
  styleUrls: ['./registered-event-organisers.component.css']
})
export class RegisteredEventOrganisersComponent implements OnInit {
  organizers: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.http.get<any[]>('http://localhost:3000/api/registered-organizers')
      .subscribe(response => {
        this.organizers = response;
      }, error => {
        console.error('Error fetching organizers:', error);
      });
  }
  goToCreateEventOrganiser() {
    this.router.navigate(['/create-event-organiser']);
  }
}
