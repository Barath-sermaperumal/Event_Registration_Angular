import { Order } from "./order";

export interface Event {
    id?:number;
    image:String;
    name:String;
    description:String;
    date:String;
    venue:String;
    host:String;
    price:number;
    availableTickets:number;
    soldTickets?:number;
    categoryName?:string;
    categoryId?:number;
    order?:Order[];
    seats?:String[]
}
