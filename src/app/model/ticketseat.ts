import { Seat } from "./seat";

export interface Ticketseat {
    userId:number;
    eventId:number;
    bookedSeats:Seat[];
}
