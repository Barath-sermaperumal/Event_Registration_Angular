import { Seat } from './seat';

export interface Orderconfirmation {
  id?: number;
  userId?: number;
  userName?: String;
  eventId?: number;
  eventName?: string;
  count?: number;
  totalPrice?: number;
  date?: String;
  orderDate?: Date;
  bookedSeats?: Seat[];
  bookedSeatsString?: String[];
}
