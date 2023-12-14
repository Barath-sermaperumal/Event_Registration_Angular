import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';
import { Category } from 'src/app/model/category';
import { Event } from 'src/app/model/event';
import { DataService } from 'src/app/service/data.service';
import { EventService } from 'src/app/service/event.service';
import { SeatingService } from 'src/app/service/seating.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
})
export class EventDetailsComponent {
  JSON: any;
  localStorage: any;

  options: AnimationOptions = {
    path: '/assets/auth.json',
  };

  constructor(
    private eventService: EventService,
    private seatingService: SeatingService,
    private router: Router
  ) {
    this.receivedData = JSON.parse(localStorage.getItem('eventDetail')!);
  }
  receivedData: Category[] = [];

  returnEvent(): Event[] {
    return JSON.parse(localStorage.getItem('eventDetail')!);
  }

  totalSeats: number = 0;
  columns = 20;
  bookedSeats: String[] = [];
  viewSeats(id: number) {
    this.eventService.getAEvents(id).subscribe({
      next: (Response: any) => {
        this.totalSeats = Response.data.availableTickets;
        this.bookedSeats = Response.data.seats;
        localStorage.setItem('event', JSON.stringify(Response.data.id));
        localStorage.setItem('totalSeats', JSON.stringify(this.totalSeats));
        localStorage.setItem('bookedSeats', JSON.stringify(this.bookedSeats));
        this.seatingService.generateSeatingLayout(
          this.totalSeats,
          this.columns
        );
      },
      complete: () => {},
      error: (error: Error) => {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    });
  }

  sleep(ms: number): Promise<void> {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, ms);
    });
  }

  runSleep(id: number) {
    try {
      this.eventService.getAEvents(id).subscribe({
        next: async (Response: any) => {
          this.totalSeats = Response.data.availableTickets;
          this.bookedSeats = Response.data.seats;
          localStorage.setItem('event', JSON.stringify(Response.data.id));
          localStorage.setItem('totalSeats', JSON.stringify(this.totalSeats));
          localStorage.setItem('bookedSeats', JSON.stringify(this.bookedSeats));
          await this.sleep(1000);
          this.seatingService.generateSeatingLayout(
            this.totalSeats,
            this.columns
          );
          this.router.navigate(['/seating']);
        },
        complete: () => {},
        error: (error: Error) => {
          console.log('Message:', error.message);
          console.log('Name:', error.name);
        },
      });
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }
}
