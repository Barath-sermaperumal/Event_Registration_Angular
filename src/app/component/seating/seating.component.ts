import { Component } from '@angular/core';
import { SeatingService } from 'src/app/service/seating.service';
import { Event } from 'src/app/model/event';
import { EventService } from 'src/app/service/event.service';
import { HomeComponent } from '../home/home.component';
import { Seat } from 'src/app/model/seat';
import { BookingService } from 'src/app/service/booking.service';
import { Ticketseat } from 'src/app/model/ticketseat';
import { JsonpClientBackend } from '@angular/common/http';
import { Orderconfirmation } from 'src/app/model/orderconfirmation';
import { AnimationOptions } from 'ngx-lottie';



@Component({
  selector: 'app-seating',
  templateUrl: './seating.component.html',
  styleUrls: ['./seating.component.css']
})
export class SeatingComponent {
localStorage: any;
JSON: any;
  // Default total number of seats
 // Default number of columns

  constructor(private seatingService:SeatingService,private bookingService:BookingService) {
    this.getSeats();
    this.getBookedSeats();
  }

  options: AnimationOptions = {
    path: '/assets/booked.json',
  };

  occupiedSeat:Seat[]=[]
  toggleSeat(seat: Seat) { 
    const bookdSeats = this.getBookedSeats();
    if (!bookdSeats.includes(seat.seatNumber)) {
      console.log(seat.occupied);
      seat.occupied = !seat.occupied;
      console.log(seat.occupied);
      if(seat.occupied){
        let newseat:Seat={
          seatNumber:seat.seatNumber,
          booked:seat.booked
        }
        this.occupiedSeat=this.occupiedSeat.concat(newseat);     
      }
    }
    return seat.occupied;
  }

  isSeatBooked(seatNumber: string): boolean {
    const bookedSeats = this.getBookedSeats();
    return bookedSeats.includes(seatNumber);
  }

  seatingLayout:Seat[][]=[];
  bookedSeatsts:String[]=this.getBookedSeats();
  getSeats(){
    return JSON.parse(localStorage.getItem("seatingLayout")!);
  }

  getBookedSeats(){
    return JSON.parse(localStorage.getItem("bookedSeats")!);
  }


  bookTickets(){
    let seat:Ticketseat={
      userId:JSON.parse(localStorage.getItem("loggedInUser")!).id,
      eventId:JSON.parse(localStorage.getItem("event")!).id,
      bookedSeats: this.occupiedSeat,
    }
    this.bookingService.bookTicket(seat).subscribe({
      next:(response:any)=>{
        seat=response.data;
        console.log(response.data);
        localStorage.setItem("orderconfirmation",JSON.stringify(response.data));
      },
      complete:()=>{},
      error:(error:Error)=>{
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      }
    });
    return seat;
  }

  order:Orderconfirmation={};

  getorder(){
    this.order=JSON.parse(localStorage.getItem("orderconfirmation")!);
    console.log(this.order);
    return this.order;
  }

}
