import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private apiUrl = 'http://localhost:3000/api/analytics';

  constructor(private http: HttpClient) {}

  getReport(type: string, period: string) {
    return this.http.post<any>(`${this.apiUrl}/report`, {
      reportType: type,
      period
    });
  }
}

