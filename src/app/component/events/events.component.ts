import { Component } from '@angular/core';
import { Event } from 'src/app/model/event';
import { EventService } from 'src/app/service/event.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html'
})
export class EventsComponent {

  constructor(private eventService:EventService){
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
  }

  event:Event[]=[];

}
