import { Component } from '@angular/core';
import { Report } from 'src/app/model/report';
import { BookingService } from 'src/app/service/booking.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class AdminHomeComponent {

  constructor(private bookingService:BookingService){
    this.getReport();
  }

  report:Report[]=[];

  getReport(){
    this.bookingService.getReport().subscribe({
      next:(Response:any)=>{
        this.report=Response.data;
      },
      complete:()=>{},
      error(error:Error) {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      }
    });
    return this.report;
  }
}
