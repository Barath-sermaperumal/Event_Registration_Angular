import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppResponse } from '../model/appResponse';
import { Seat } from '../model/seat';
import { EventService } from './event.service';

@Injectable({
  providedIn: 'root'
})

export class SeatingService {

  constructor(private http:HttpClient,private eventService:EventService) { }
  getSeats():Observable<AppResponse> {
    return this.http.get<AppResponse>(
      `http://localhost:8080/EventRegistration/API/User/Event/6`
    );
  }

  generateSeatingLayout(seat:number,columns:number){
  let seatingLayout:Seat[][]=[];
    let totalSeats:number=Number(localStorage.getItem("totalSeats"));
    console.log(totalSeats);
    
    const rows = Math.ceil(totalSeats / columns);
    let seatCounter = 1;

    for (let i = 0; i < rows; i++) {
      const row: Seat[] = [];
      for (let j = 0; j < columns; j++) {
        if (seatCounter <= totalSeats) {
          row.push({ seatNumber: `${seatCounter}`, occupied: false, booked:false });
          seatCounter++;
        } else {
          break;
        }
      }
      seatingLayout.push(row);      
    }
    localStorage.setItem("seatingLayout",JSON.stringify(seatingLayout));
  }
}
