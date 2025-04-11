import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from '../services/analytics.service';
import { ChartConfiguration, ChartType } from 'chart.js';

@Component({
  selector: 'app-analytics-report',
  templateUrl: './analytics-report.component.html',
  styleUrls: ['./analytics-report.component.css'],
  providers: [AnalyticsService],
  standalone: false
})
export class AnalyticsReportComponent implements OnInit {
  reportType = 'ticketSales';
  period = 'daily';
  reportData: any[] = [];

  chartType: 'bar' | 'line' = 'bar';

  chartData: ChartConfiguration<'bar' | 'line'>['data'] = {
    labels: [],
    datasets: [
      {
        label: 'Tickets Sold',
        data: [],
        backgroundColor: '#42A5F5'
      }
    ]
  };

  chartOptions: ChartConfiguration<'bar' | 'line'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true
      },
      title: {
        display: true,
        text: 'Ticket Sales'
      }
    }
  };

  constructor(private analyticsService: AnalyticsService) {}

  ngOnInit(): void {
    this.generateReport();
  }

  generateReport() {
    this.analyticsService.getReport(this.reportType, this.period).subscribe(
      (data) => {
        this.reportData = data.report;
        this.prepareChartData(this.reportData);
      },
      (error) => {
        console.error('Error fetching report:', error);
      }
    );
  }

  prepareChartData(data: any[]) {
    const groupedData: { [key: string]: number } = {};

    data.forEach((entry) => {
      const label = this.getLabelByPeriod(entry.createdAt);

      let value: number = 0;
      if (this.reportType === 'revenue') {
        value = entry.totalPrice;
      } else if (this.reportType === 'ticketSales') {
        value = entry.quantity;
      } else if (this.reportType === 'seatOccupancy') {
        value = parseFloat(entry.occupancy);
      }

      groupedData[label] = (groupedData[label] || 0) + value;
    });

    const labels = Object.keys(groupedData);
    const values = Object.values(groupedData);

    if (this.chartOptions && this.chartOptions.plugins && this.chartOptions.plugins.title) {
      if (this.reportType === 'revenue') {
        this.chartType = 'line';
        this.chartData.datasets = [{
          label: 'Revenue',
          data: values,
          borderColor: '#4bc0c0',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: true,
          tension: 0.3
        }];
        this.chartOptions.plugins.title.text = 'Revenue Over Time';
      } else if (this.reportType === 'ticketSales') {
        this.chartType = 'bar';
        this.chartData.datasets = [{
          label: 'Tickets Sold',
          data: values,
          backgroundColor: '#42A5F5'
        }];
        this.chartOptions.plugins.title.text = 'Ticket Sales';
      } else if (this.reportType === 'seatOccupancy') {
        this.chartType = 'line';
        this.chartData.datasets = [{
          label: 'Seat Occupancy (%)',
          data: values,
          borderColor: '#ffa726',
          backgroundColor: 'rgba(255, 167, 38, 0.2)',
          fill: true,
          tension: 0.3
        }];
        this.chartOptions.plugins.title.text = 'Seat Occupancy Over Time';
      }
    }

    this.chartData.labels = labels;
  }

  getLabelByPeriod(dateString: string): string {
    const date = new Date(dateString);

    switch (this.period) {
      case 'daily':
        return date.toISOString().split('T')[0];
      case 'weekly':
        const startOfWeek = new Date(date);
        startOfWeek.setDate(date.getDate() - date.getDay());
        return startOfWeek.toISOString().split('T')[0];
      case 'monthly':
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      default:
        return date.toISOString();
    }
  }
}














