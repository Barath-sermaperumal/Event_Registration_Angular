import { Component } from '@angular/core';
import { Event } from 'src/app/model/event';
import { EventService } from 'src/app/service/event.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html'
})
export class EventComponent {
  constructor(private eventService:EventService){
    this.getAllEvents();
  }

  event:Event[]=[];
  getAllEvents(){
    this.eventService.getAllEvents().subscribe({
      next:(response:any)=>{
        this.event = response.data;
      },
      complete:()=>{},
      error: (error: Error) => {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    })
  }

  singleEvent:Event={
    name:"",
    description:"",
    venue:"",
    date:"",
    host:"",
    price:0,
    availableTickets:0,
  }

  getAEvent(id:number){
    this.eventService.getAEvents(id).subscribe({
      next: (Response:any)=>{
        this.singleEvent=Response.data;
      },
      complete:()=>{},
      error:(error:Error)=>{
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    });
    return this.singleEvent;
  }

  addproduct(){
    if(this.singleEvent.name!==null){
      this.singleEvent={
        name:"",
        description:"",
        venue:"",
        date:"",
        host:"",
        price:0,
        availableTickets:0,
      }
    }
    return this.singleEvent;
  }

}
