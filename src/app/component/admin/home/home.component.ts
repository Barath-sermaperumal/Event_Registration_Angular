import { Component } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { Report } from 'src/app/model/report';
import { BookingService } from 'src/app/service/booking.service';
import { PdfGeneratorService } from 'src/app/service/pdf-generator-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class AdminHomeComponent {
  constructor(
    private bookingService: BookingService,
    private pdfGeneratorService: PdfGeneratorService
  ) {
    this.getReport();
  }

  public pieChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false
    // Add more options as needed
  };

  report: Report[] = [];
  fullReport: Report[] = [];
  search: String = '';
  options: AnimationOptions = {
    path: '/assets/not found.json',
  };

  getReport() {
    this.bookingService.getReport().subscribe({
      next: (Response: any) => {
        this.report = Response.data;
        this.fullReport = Response.data;
      },
      complete: () => {},
      error(error: Error) {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    });
    return this.report;
  }

  downloadPdf(): void {
    console.log('download component');

    this.pdfGeneratorService.downloadPdf('reportTable', 'Report');
  }

  //Search
  searchReport() {
    this.report = this.fullReport.filter((e: any) => {
      return e.eventName.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
    });
  }
}
