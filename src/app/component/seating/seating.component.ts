import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { SeatingService } from 'src/app/service/seating.service';
import { Event } from 'src/app/model/event';
import { EventService } from 'src/app/service/event.service';
import { HomeComponent } from '../home/home.component';
import { Seat } from 'src/app/model/seat';
import { BookingService } from 'src/app/service/booking.service';
import { Ticketseat } from 'src/app/model/ticketseat';
import { JsonpClientBackend } from '@angular/common/http';
import { Orderconfirmation } from 'src/app/model/orderconfirmation';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-seating',
  templateUrl: './seating.component.html',
})
export class SeatingComponent {
  localStorage: any;
  JSON: any;

  isToggled: boolean = false;

  toggleClass(event: any) {
    this.isToggled = event.target.checked;
  }

  // Default total number of seats
  // Default number of columns

  constructor(
    private router: Router,
    private seatingService: SeatingService,
    private bookingService: BookingService
  ) {
    this.getBookedSeats();
    this.localSeats = this.getSeats();
  }

  options: AnimationOptions = {
    path: '/assets/booked.json',
  };

  occupiedSeat: Seat[] = [];

  toggleSeat(seat: Seat) {
    const bookdSeats = this.getBookedSeats();
    if (!bookdSeats.includes(seat.seatNumber)) {
      console.log(seat.occupied);
      seat.occupied = !seat.occupied;
      console.log(seat.occupied);
      if (seat.occupied) {
        let newseat: Seat = {
          seatNumber: seat.seatNumber,
          booked: seat.booked,
        };
        this.occupiedSeat = this.occupiedSeat.concat(newseat);
      }
    }
    return seat;
  }

  occupied(seat: Seat) {
    seat.occupied = !seat.occupied;
  }

  isSeatBooked(seatNumber: string): boolean {
    const bookedSeats = this.getBookedSeats();
    return bookedSeats.includes(seatNumber);
  }

  seatingLayout: Seat[][] = [];
  bookedSeatsts: String[] = this.getBookedSeats();

  localSeats: Seat[][] = this.getSeats();

  getSeats() {
    return JSON.parse(localStorage.getItem('seatingLayout')!);
  }

  getBookedSeats() {
    return JSON.parse(localStorage.getItem('bookedSeats')!);
  }

  bookTickets() {
    let seat: Ticketseat = {
      userId: JSON.parse(localStorage.getItem('loggedInUser')!).id,
      eventId: JSON.parse(localStorage.getItem('event')!).id,
      bookedSeats: this.occupiedSeat,
    };
    this.bookingService.bookTicket(seat).subscribe({
      next: (response: any) => {
        seat = response.data;
        console.log(response.data);
        localStorage.setItem(
          'orderconfirmation',
          JSON.stringify(response.data)
        );
      },
      complete: () => {},
      error: (error: Error) => {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    });
    this.bookingService.sendEmail().subscribe({
      next: (response: any) => {
        console.log(response);
      },
      complete: () => {},
      error: (error: Error) => {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    });
    return seat;
  }

  order: Orderconfirmation = {};
  currentDate: Date = new Date();

  getorder() {
    this.order = JSON.parse(localStorage.getItem('orderconfirmation')!);

    return this.order;
  }

  downloadReceipt() {
    // Create a sample receipt content (you can replace this with your actual receipt data)
    const receiptContent =
      'Order ID: ' +
      this.getorder().id +
      '\nDate: ' +
      this.currentDate +
      '\nTotal: ' +
      this.getorder().totalPrice! * this.getorder().count! +
      '\n\nThank you for your order!';

    // Create a Blob containing the receipt content
    const blob = new Blob([receiptContent], { type: 'text/plain' });

    // Create a temporary link element
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'order_receipt.txt'; // Set the filename for the downloaded file

    // Append the link to the document body and simulate a click to trigger the download
    document.body.appendChild(link);
    link.click();

    // Cleanup: remove the temporary link element
    document.body.removeChild(link);

    this.router.navigate(['/order'], { replaceUrl: true });
  }
}
