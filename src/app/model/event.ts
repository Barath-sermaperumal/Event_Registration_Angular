export interface Event {
    id?:number;
    name:String;
    description:String;
    date:String;
    venue:String;
    host:String;
    price:number;
    availableTickets:number;
    soldTickets?:number;
}
