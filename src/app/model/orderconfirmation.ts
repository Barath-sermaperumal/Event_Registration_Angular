import { Seat } from "./seat";

export interface Orderconfirmation {
    id?:number;
    userId?:number;
    userName?:String;
    eventId?:number;
    eventName?:string;
    count?:number;
    totalPrice?:number;
    date?:String;
    bookedSeats?:Seat[];
    bookedSeatsString?:String[];
}
