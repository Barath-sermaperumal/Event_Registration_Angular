import { Component } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { Order } from 'src/app/model/order';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-userorder',
  templateUrl: './userorder.component.html'
})
export class UserorderComponent {
  constructor(private orderService:OrderService){
    this.getUserOrder();
  }

  options: AnimationOptions = {
    path: '/assets/order.json',
  };

  name:string=JSON.parse(localStorage.getItem("loggedInUser")!).name;

  order:Order[]=[]
  getUserOrder(){
    this.orderService.getUserOrder().subscribe({
      next:(Response:any)=>{
        this.order=Response.data;
      },
      complete:()=>{},
      error:()=>{
        console.log("Error");
        
      }
    });
    return this.order;
  }

}
