import { Component } from '@angular/core';
import { AnalyticsService } from '../services/analytics.service';

@Component({
  selector: 'app-analytics-report',
  templateUrl: './analytics-report.component.html',
})
export class AnalyticsReportComponent {
  reportType = 'ticketSales';
  period = 'daily';
  reportData: any[] = [];

  constructor(private analyticsService: AnalyticsService) {}

  generateReport() {
    this.analyticsService.getReport(this.reportType, this.period).subscribe(
      (data) => {
        this.reportData = data.report;
      },
      (error) => {
        console.error('Error fetching report:', error);
      }
    );
  }
}

