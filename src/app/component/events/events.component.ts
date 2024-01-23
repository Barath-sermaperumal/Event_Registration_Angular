import { Seat } from './../../model/seat';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';
import { AppResponse } from 'src/app/model/appResponse';
import { Category } from 'src/app/model/category';
import { Event } from 'src/app/model/event';
import { Filteredevents } from 'src/app/model/filteredevents';
import { CategoryService } from 'src/app/service/category.service';
import { EventService } from 'src/app/service/event.service';
import { SeatingService } from 'src/app/service/seating.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html'
})
export class EventsComponent {
  constructor(
    private eventService: EventService,
    private seatingService: SeatingService,
    private router: Router,
    private categoryService: CategoryService,
    private formbuilder:FormBuilder
  ) {
    this.getCategories();
    eventService.getAllEvents().subscribe({
      next: (response: any) => {
        this.event = response.data;
        this.resultData = response.data;
        for (this.index = 0; this.index < response.data.length; this.index++) {
          this.dummy[this.index] = this.event[this.index].price!;
        }
        this.dummy.sort();
        this.minLimit = this.dummy[0];
        this.maxLimit = this.dummy[this.index - 1];
      },
      complete: () => {},
      error: (error: Error) => {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    });
  }

  resultData: Event[] = [];
  event: Event[] = [];
  minLimit = 0;
  maxLimit = 0;
  dummy: number[] = [];
  index = 0;
  singleEvent: Event = <Event>{};
  totalSeats: number = 0;
  columns: number = 20;
  bookedSeats: String[] = [];

  viewSeats(a: Event) {
    this.singleEvent = a;
    let id: number = a.id!;
    this.eventService.getAEvents(id).subscribe({
      next: (Response: any) => {
        this.totalSeats = Response.data.availableTickets;
        this.bookedSeats = Response.data.seats;
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

  fromDate: Date | null= null;
  toDate: Date | null= null;
  filterByDate(form: NgForm) {
    this.fromDate = form.value.fromDate;
    this.toDate = form.value.toDate;
    this.resultData = this.resultData.filter((single) => {
      const date = new Date(single.date.toString());
      return date >= new Date(this.fromDate!) && date <= new Date(this.toDate!);
    });
  }

  minPrice = this.minLimit;
  maxPrice = this.maxLimit;
  filterByPrice(form: NgForm) {
    this.minPrice = form.value.minPrice;
    this.maxPrice = form.value.maxPrice;
    this.resultData = this.resultData.filter((single) => {
      return single.price! >= this.minPrice && single.price! <= this.maxPrice;
    });
    console.log(this.resultData);
  }

  categories: Category[] = [];
  getCategories() {
    this.categoryService.getAllCategories().subscribe({
      next: (Response: any) => {
        this.categories = Response.data;
      },
      complete: () => {},
      error: (error: Error) => {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    });
  }

  filterByCategory(id: number) {
    this.categoryService.getACategory(id).subscribe({
      next: (Response: any) => {
        this.resultData = Response.data;
      },
      complete: () => {},
      error: (error: Error) => {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    });
  }

  getUniqueVenues():Event[] {
    const key="venue"
    return [...new Map(this.event.map(item =>[item[key], item])).values()]

  }


  filterByVenues(venue: String) {
    this.resultData = this.event.filter((event) => event.venue === venue);
  }

  resetForm() {
    this.resultData = this.event;
  }

  search: String = '';
  searchReport() {
    this.resultData = this.event.filter((e: Event) => {
      return e.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
    });
  }

  options: AnimationOptions = {
    path: '/assets/discount.json',
  };

  getSeats() {
    let seat: Seat[] = JSON.parse(localStorage.getItem('seatingLayout')!);
    this.router.navigate(['/seating']);
    return seat;
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
      console.log(date, fromDate, toDate);

      if (date >= fromDate && date <= toDate) {
        return discount.description;
      }
    }
    return '';
  }

  filteredEvents: Filteredevents = <Filteredevents>{};
  checkedCategory: number[] = [];
  checkedVenue: number[] = [];
  onChange(form: NgForm) {
    let formData = form.value;
    if(form.value.minPrice===0){
      form.value.minPrice = this.minLimit;
    }
    if(form.value.maxPrice===0){
      form.value.maxPrice = this.maxLimit;
    }
    if(form.value.fromDate === null){
      form.value.fromDate = new Date('2023-12-01');
    }
    if(form.value.toDate === null){
      form.value.toDate = new Date('2024-02-29');
    }

    this.filteredEvents.fromDate = formData.fromDate;
    this.filteredEvents.toDate = formData.toDate;
    this.filteredEvents.minPrice = formData.minPrice;
    this.filteredEvents.maxPrice = formData.maxPrice;
    this.filteredEvents.checkedCategory = this.checkedCategory;
    this.filteredEvents.checkedVenue = this.checkedVenue;
    console.log(this.filteredEvents);

    this.eventService.getFilteredEvents(this.filteredEvents).subscribe({
      next: (Response: any) => {
        this.resultData = Response.data;
      },
      complete: () => {},
      error: (error: Error) => {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    });
  }

  onCategoryCheckboxChange(event: any, itemId: number) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.checkedCategory.push(itemId);
    } else {
      const index = this.checkedCategory.indexOf(itemId);
      if (index !== -1) {
        this.checkedCategory.splice(index, 1);
      }
    }
    console.log(this.checkedCategory);
  }

  onVenueCheckboxChange(event: any, itemId: number) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.checkedVenue.push(itemId); // Push the ID to the checkedItems array if checked
    } else {
      const index = this.checkedVenue.indexOf(itemId);
      if (index !== -1) {
        this.checkedVenue.splice(index, 1); // Remove the ID from the checkedItems array if unchecked
      }
    }
    console.log(this.checkedVenue); // Output the checkedItems array
    // You can use this.checkedItems as needed, for example, send it to a service or perform further operations.
  }

  filter!: FormGroup;

  getMinDate(): string {
    const today = new Date('2023-12-01');
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${today.getFullYear()}-${month}-${day}`;
  }

    //sorting functions
    nameSortDirection = 'desc';
    sortByName() {
      // Reverse the sort direction if the same column is clicked again
      this.nameSortDirection = this.nameSortDirection === 'asc' ? 'desc' : 'asc';
      this.resultData.sort((a, b) => {
        const modifier = this.nameSortDirection === 'asc' ? 1 : -1;
        this.nameSortDirection;
        return a.name.localeCompare(b.name.toString()) * modifier;
      });
    }

    priceSortDirection = 'desc';
    sortByPrice() {
      if (this.priceSortDirection === 'desc') {
        this.resultData = this.resultData.sort((a, b) => a.price! - b.price!);
        this.priceSortDirection = 'asc';
      } else {
        this.resultData = this.resultData.sort((a, b) => b.price! - a.price!);
        this.priceSortDirection = 'desc';
      }
    }

    dateSortDirection = 'desc';
    sortByDate() {
      this.dateSortDirection = this.dateSortDirection === 'asc' ? 'desc' : 'asc';
      this.resultData.sort((a, b) => {
        const formattedDateA = new Date(a.date.toString());
        const formattedDateB = new Date(b.date.toString());
        const modifier = this.dateSortDirection === 'asc' ? 1 : -1;
        this.dateSortDirection;
        return (
          (<any>new Date(formattedDateA) - <any>new Date(formattedDateB)) *
          modifier
        );
      });
    }

}
