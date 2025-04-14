import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from '../services/analytics.service';
import { ChartConfiguration } from 'chart.js';
import { Router } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

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
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        labels: {
          font: {
            size: 14,
            family: 'Arial',
            weight: 'bold'
          }
        }
      },
      title: {
        display: true,
        text: 'Ticket Sales',
        font: {
          size: 25,
          family: 'Arial',
          weight: 'bold'
        },
        color: '#333'
      }
    },
    scales: {
      x: {
        beginAtZero: true
      },
      y: {
        beginAtZero: true
      }
    }
  };

  constructor(private analyticsService: AnalyticsService, private router: Router) {}

  goBackToEventHomepage() {
    this.router.navigate(['/event-homepage']);
  }

  ngOnInit(): void {
    this.generateReport();
  }

  generateReport() {
    this.analyticsService.getReport(this.reportType, this.period).subscribe(
      (data) => {
        console.log('Raw report data:', data.report);
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
      const rawDate = entry.createdAt || entry.label;
      const label = this.getLabelByPeriod(rawDate);

      let value: number = 0;
      if (this.reportType === 'revenue') {
        value = entry.totalPrice;
      } else if (this.reportType === 'ticketSales') {
        value = entry.quantity;
      } else if (this.reportType === 'seatOccupancy') {
        value = parseFloat(entry.occupancyRate ?? entry.occupancy ?? '0');
      }

      groupedData[label] = (groupedData[label] || 0) + value;
    });

    const sortedLabels = Object.keys(groupedData).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
    const sortedValues = sortedLabels.map(label => groupedData[label]);

    this.chartData.labels = sortedLabels;

    if (this.chartOptions?.plugins?.title) {
      if (this.reportType === 'revenue') {
        this.chartType = 'line';
        this.chartData.datasets = [{
          label: 'Revenue',
          data: sortedValues,
          borderColor: '#413d3c',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: true,
          tension: 0.3
        }];
        this.chartOptions.plugins.title.text = 'Revenue Over Time';
      } else if (this.reportType === 'ticketSales') {
        this.chartType = 'bar';
        this.chartData.datasets = [{
          label: 'Tickets Sold',
          data: sortedValues,
          backgroundColor: '#42A5F5'
        }];
        this.chartOptions.plugins.title.text = 'Ticket Sales';
      } else if (this.reportType === 'seatOccupancy') {
        this.chartType = 'line';
        this.chartData.datasets = [{
          label: 'Seat Occupancy (%)',
          data: sortedValues,
          borderColor: '#ffa726',
          backgroundColor: 'rgba(255, 167, 38, 0.2)',
          fill: true,
          tension: 0.3
        }];
        this.chartOptions.plugins.title.text = 'Seat Occupancy Over Time';
      }
    }
  }

  getLabelByPeriod(dateString: string): string {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      console.warn('Invalid date:', dateString);
      return 'Invalid Date';
    }

    switch (this.period) {
      case 'daily':
        return date.toISOString().split('T')[0];

      case 'weekly':
        const sunday = new Date(date);
        sunday.setDate(date.getDate() - date.getDay());
        return sunday.toISOString().split('T')[0];

      case 'monthly':
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

      default:
        return date.toISOString();
    }
  }

  downloadPDF() {
    const chartElement = document.getElementById('chart-container');
    if (!chartElement) return;

    html2canvas(chartElement).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 10, pdfWidth, pdfHeight);
      pdf.save(`${this.reportType}-report.pdf`);
    });
  }

  confirmDownload() {
    const confirmed = window.confirm('Are you sure you want to download this report as a PDF?');
    if (confirmed) {
      this.downloadPDF();
    }
  }
}


















