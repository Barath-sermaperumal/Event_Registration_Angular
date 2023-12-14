export interface Order {
  id: number;
  userId: number;
  eventId: number;
  userName: string;
  eventName: string;
  count: number;
  totalPrice: number;
  date: string;
  bookedSeats?: String[];
  bookedSeatsString?: String[];
}
