import { Component } from '@angular/core';
import { Order } from 'src/app/model/order';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
})
export class OrderComponent {
  constructor(private orderService: OrderService) {
    this.getAllOrders();
  }

  order: Order[] = [];
  getAllOrders() {
    this.orderService.getAllOrders().subscribe({
      next: (response: any) => {
        this.order = response.data;
      },
      complete: () => {},
      error: (error: Error) => {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    });
  }
}
