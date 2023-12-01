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
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  event: Event[] = [];
  category: Category[] = [];
  constructor(
    private eventService: EventService,
    private categoryService: CategoryService,
    private bookingService: BookingService,
    private seatingService: SeatingService,
    private dataService: DataService
  ) {
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
      next: (response: any) => {
        this.category = response.data;
      },
      complete: () => {},
      error: (error: Error) => {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    });
  }

  totalSeats: number = 0;
  columns = 20;
  bookedSeats: String[] = [];
  viewSeats(a: Event) {
    this.singleEvent = a;
    let id: number = a.id!;
    this.eventService.getAEvents(id).subscribe({
      next: (Response: any) => {
        this.totalSeats = Response.data.availableTickets;
        this.bookedSeats = Response.data.seats;
        console.log(Response.data.seats);
        localStorage.setItem('event', JSON.stringify(Response.data));
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

  e: Event[] = [];
  viewCategory(id: number) {
    this.categoryService.getACategory(id).subscribe({
      next: (Response: any) => {
        this.dataService.dataArray = Response.data;
        localStorage.setItem('eventDetail', JSON.stringify(Response.data));
      },
      complete: () => {},
      error: (error: Error) => {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    });
  }

  singleEvent: Event = {
    id: 0,
    name: '',
    image: '',
    description: '',
    venue: '',
    date: '',
    host: '',
    price: 0,
    availableTickets: 0,
    categoryId: 0,
  };

  getSeats() {
    return JSON.parse(localStorage.getItem('seatingLayout')!);
  }
}
