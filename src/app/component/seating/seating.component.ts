import { Component } from '@angular/core';
import { SeatingService } from 'src/app/service/seating.service';
import { Event } from 'src/app/model/event';
import { EventService } from 'src/app/service/event.service';
import { HomeComponent } from '../home/home.component';
import { Seat } from 'src/app/model/seat';



@Component({
  selector: 'app-seating',
  templateUrl: './seating.component.html',
  styleUrls: ['./seating.component.css']
})
export class SeatingComponent {
  // Default total number of seats
 // Default number of columns

  constructor(private seatingService:SeatingService) {
    this.getSeats();
  }

  toggleSeat(seat: Seat) {
    seat.occupied = !seat.occupied;
  }

  seatingLayout:Seat[][]=[];

  getSeats(){
    return JSON.parse(localStorage.getItem("seatingLayout")!);
  }

  bookTickets(){
    
  }
}
