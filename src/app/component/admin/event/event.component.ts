import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

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

  id:number=0;
  name:String="";
  image:String="";
  description:String="";
  venue:String="";
  date:String="";
  host:String="";
  price:number=0;
  availableTickets:number=0;
  categoryId:number=0;

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
    id:0,
    name:"",
    image:"",
    description:"",
    venue:"",
    date:"",
    host:"",
    price:0,
    availableTickets:0,
    categoryId:0
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

  addproduct(form:NgForm){
    let formvalue:Event=form.value;

    const formData=new FormData();
    formData.append('id',formvalue.id!.toString());
    formData.append('name',formvalue.name.toString());
    formData.append('description',formvalue.description.toString());
    formData.append('image',this.file);
    formData.append('venue',formvalue.venue.toString());
    formData.append('date',formvalue.date.toString());
    formData.append('host',formvalue.host.toString());
    formData.append('availableTickets',formvalue.availableTickets.toString());
    formData.append('price',formvalue.price.toString());
    formData.append('categoryId',formvalue.categoryId!.toString());

    this.eventService.addProduct(formData).subscribe({
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

  openModal(event:Event){
    this.singleEvent=event;
    return this.singleEvent;
  }

  deleteEvent(id:number){
    this.eventService.deleteEvent(id).subscribe({
      next: (Response:any)=>{
      },
      complete:()=>{},
      error:(error:Error)=>{
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    })
  }

  file='';
  onFileChange(event: any) {
    const fileInput = event.target;
    if (fileInput && fileInput.files.length > 0) {
      this.file = fileInput.files[0];
    }
  }

}
