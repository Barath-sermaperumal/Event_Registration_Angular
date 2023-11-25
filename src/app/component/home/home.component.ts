import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeService } from 'src/app/service/home.service';
import { EventService } from 'src/app/service/event.service';
import { Event } from 'src/app/model/event';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/service/category.service';
import { BookingService } from 'src/app/service/booking.service';
import { SeatingService } from 'src/app/service/seating.service';
import { SeatingComponent } from '../seating/seating.component';
import { Seat } from 'src/app/model/seat';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  event:Event[]=[];
  category:Category[]=[];
  constructor(private eventService:EventService,
    private categoryService:CategoryService,
    private bookingService:BookingService,
    private seatingService:SeatingService) {
    eventService.getAllEvents().subscribe({
      next: (response: any) => {
        this.event = response.data;
      },
      complete: () => {},
      error: (error: Error) => {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    });

    categoryService.getAllCategories().subscribe({
      next:(response: any)=>{
        this.category=response.data;
      },
      complete:()=>{},
      error:(error:Error)=>{
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      }
    })
  }

  totalSeats:number=0;
  columns = 20;
  bookedSeats:String[]=[];
  viewSeats(id:number){
    this.eventService.getAEvents(id).subscribe({
      next: (Response:any)=>{
        this.totalSeats=Response.data.availableTickets;
        this.bookedSeats=Response.data.seats;
        console.log(Response.data.seats);
        localStorage.setItem("event",JSON.stringify(Response.data.id));
        localStorage.setItem("totalSeats",JSON.stringify(this.totalSeats));
        localStorage.setItem("bookedSeats",JSON.stringify(this.bookedSeats));
        this.seatingService.generateSeatingLayout(this.totalSeats,this.columns)
      },
      complete:()=>{},
      error:(error:Error)=>{
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    });
  }

  viewCategory(id:number){
    this.categoryService.getACategory(id).subscribe({
      next:(Response:any)=>{
        
      },
      complete:()=>{},
      error:(error:Error)=>{
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      }
    });
  }
}
