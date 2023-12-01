export interface Order {
  id: number;
  eventId: number;
  userName: string;
  eventName: string;
  count: number;
  totalPrice: number;
  date: string;
  bookedSeats?: String[];
  bookedSeatsString?: String[];
}
