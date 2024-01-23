import { Router } from '@angular/router';
import { DiscountService } from './../../service/discount.service';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventService } from 'src/app/service/event.service';
import { Event } from 'src/app/model/event';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/service/category.service';
import { BookingService } from 'src/app/service/booking.service';
import { SeatingService } from 'src/app/service/seating.service';
import { SeatingComponent } from '../seating/seating.component';
import { Seat } from 'src/app/model/seat';
import { DataService } from 'src/app/service/data.service';
import { Discount } from 'src/app/model/discount';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  @ViewChild('scrollContent', { static: false }) scrollContent!: ElementRef;

  @ViewChild('scrollContainer') scrollContainer!: ElementRef;
  @ViewChild('content') content!: ElementRef;

  @ViewChild('scrollContainers') scrollContainers!: ElementRef;
  @ViewChild('contents') contents!: ElementRef;

  options: AnimationOptions = {
    path: '/assets/discount.json',
  };

  event: Event[] = [];
  category: Category[] = [];
  constructor(
    private eventService: EventService,
    private categoryService: CategoryService,
    private bookingService: BookingService,
    private seatingService: SeatingService,
    private dataService: DataService,
    private discountService: DiscountService
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

    eventService.getAllTopEvents().subscribe({
      next: (response: any) => {
        this.topEvents = response.data;
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

  topEvents: Event[] = [];
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

  scrollLeft() {
    this.scrollContent.nativeElement.scrollLeft -= 100; // Adjust scroll amount
  }

  scrollRight() {
    this.scrollContent.nativeElement.scrollLeft += 200; // Adjust scroll amount
  }

  getDate(date: any): String {
    return new Date(date).toISOString().split('T')[0];
  }

  getDiscounts(): boolean {
    let discounts: any = JSON.parse(localStorage.getItem('Discounts')!);
    let date: any = this.getDate(new Date());
    for (let discount of discounts) {
      let fromDate = this.getDate(discount.fromDate);
      let toDate = this.getDate(discount.toDate);
      if (date >= fromDate && date <= toDate) {
        return true;
      }
    }

    return false;
  }

  getDiscountPercent(): number {
    let discounts: any = JSON.parse(localStorage.getItem('Discounts')!);
    let date: any = this.getDate(new Date());
    for (let discount of discounts) {
      let fromDate = this.getDate(discount.fromDate);
      let toDate = this.getDate(discount.toDate);
      if (date >= fromDate && date <= toDate) {
        return discount.discount;
      }
    }
    return 0;
  }

  getDiscountPrice(price: number): number {
    let discountPercent: number = this.getDiscountPercent();
    return price - (discountPercent / 100) * price;
  }

  getDiscountDescription(): String {
    let discounts: any = JSON.parse(localStorage.getItem('Discounts')!);
    let date: any = this.getDate(new Date());

    for (let discount of discounts) {
      let fromDate = this.getDate(discount.fromDate);
      let toDate = this.getDate(discount.toDate);

      if (date >= fromDate && date <= toDate) {
        return discount.description;
      }
    }
    return '';
  }

  scrollCategory(distance: number) {
    this.scrollContainer.nativeElement.scrollTo({
      left: this.scrollContainer.nativeElement.scrollLeft + distance,
      behavior: 'smooth',
    });
  }

  scrollEvent(distance: number) {
    this.scrollContainers.nativeElement.scrollTo({
      left: this.scrollContainers.nativeElement.scrollLeft + distance,
      behavior: 'smooth',
    });
  }
}
