import { Component } from '@angular/core';
import { Event } from 'src/app/model/event';
import { EventService } from 'src/app/service/event.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
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

}
