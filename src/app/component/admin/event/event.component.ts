import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Event } from 'src/app/model/event';
import { EventService } from 'src/app/service/event.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
})
export class EventComponent{

  constructor(private eventService: EventService) {
    this.getAllEvents();
    this.totalPages = Math.ceil(JSON.parse(localStorage.getItem("Events")!).length / this.itemsPerPage);
    this.setPage(1);
  }

  currentPage = 1;
  itemsPerPage = 4; // Number of items per page
  pagedItems:Event[]=[]
  totalPages: number;

  id: number = 0;
  name: String = '';
  image: String = '';
  description: String = '';
  venue: String = '';
  date: String = '';
  host: String = '';
  price: number = 0;
  availableTickets: number = 0;
  categoryId: number = 0;

  event: Event[] = [];

  singleEvent: Event = {
    id: 0,
    name: '',
    image: '',
    description: '',
    venue: '',
    date: '',
    host: '',
    price: null,
    availableTickets: null,
    categoryId: null,
  };

  getAllEvents() {
    this.eventService.getAllEvents().subscribe({
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

  getAEvent(id: number) {
    this.eventService.getAEvents(id).subscribe({
      next: (Response: any) => {
        this.singleEvent = Response.data;
      },
      complete: () => {},
      error: (error: Error) => {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    });
    return this.singleEvent;
  }

  addproduct(form: NgForm) {

    let formvalue: Event = form.value;

    const formData = new FormData();
    formData.append('id', formvalue.id!.toString());
    formData.append('name', formvalue.name.toString());
    formData.append('description', formvalue.description.toString());
    formData.append('image', this.file);
    formData.append('venue', formvalue.venue.toString());
    formData.append('date', formvalue.date.toString());
    formData.append('host', formvalue.host.toString());
    formData.append('availableTickets', formvalue.availableTickets!.toString());
    formData.append('price', formvalue.price!.toString());
    formData.append('categoryId', formvalue.categoryId!.toString());

    this.eventService.addProduct(formData).subscribe({
      next: (Response: any) => {
        this.singleEvent = Response.data;
      },
      complete: () => {},
      error: (error: Error) => {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    });
    form.resetForm();
    return this.singleEvent;
  }

  openModal(event: Event) {
    this.singleEvent = event;
    return this.singleEvent;
  }

  deleteEvent(id: number) {
    this.eventService.deleteEvent(id).subscribe({
      next: (Response: any) => {},
      complete: () => {},
      error: (error: Error) => {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    });
  }

  file = '';
  onFileChange(event: any) {
    const fileInput = event.target;
    if (fileInput && fileInput.files.length > 0) {
      this.file = fileInput.files[0];
    }
  }

  //sorting functions
  nameSortDirection = 'desc';
  sortByName(){
      // Reverse the sort direction if the same column is clicked again
      this.nameSortDirection = this.nameSortDirection === 'asc' ? 'desc' : 'asc';
        this.event.sort((a, b) => {
          const modifier = this.nameSortDirection === 'asc' ? 1 : -1;
          this.nameSortDirection
          return a.name.localeCompare(b.name.toString()) * modifier;
        });
    }

  priceSortDirection = "desc";
  sortByPrice(){
    if(this.priceSortDirection==="desc"){
      this.event = this.event.sort((a,b)=>a.price!-b.price!);
      this.priceSortDirection="asc";
    }
    else{
      this.event = this.event.sort((a,b)=>b.price!-a.price!);
      this.priceSortDirection="desc";
    }

  }

  dateSortDirection = "desc";
  sortByDate() {
    this.dateSortDirection = this.dateSortDirection === 'asc' ? 'desc' : 'asc';
    this.event.sort((a, b) => {
      const formattedDateA = new Date(a.date.toString());
      const formattedDateB = new Date(b.date.toString());
      const modifier = this.dateSortDirection === 'asc' ? 1 : -1;
      this.dateSortDirection
      return (<any>new Date(formattedDateA) - <any>new Date(formattedDateB)) * modifier;
    });
  }

  //filtering functions
  filterDate()
  // filterDate(a:Date,b:Date)
  {
    let a=new Date('2023-12-02');
    let b=new Date('2024-12-03');
    this.event=this.event.filter((sorted)=>{
      const formattedDate = new Date(sorted.date.toString());
      formattedDate > a && formattedDate < b
    })
    console.log(this.event);

  }

  addReset(){
    this.singleEvent=<Event>{};
  }

  getEvents():Event[]{
    return this.event;
  }

  //Pagination
  setPage(page: number) {

    let events:Event[]=JSON.parse(localStorage.getItem("Events")!);
    if (page < 1 || page > this.totalPages) {
      return;
    }
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage - 1, events.length - 1);
    this.pagedItems = events.slice(startIndex, endIndex + 1);
    this.currentPage = page;

  }

  nextPage() {
    this.setPage(this.currentPage + 1);
  }

  previousPage() {
    this.setPage(this.currentPage - 1);
  }
}

