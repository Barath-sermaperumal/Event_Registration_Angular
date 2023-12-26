import { Order } from './order';

export interface Event {
  id?: number;
  image: String;
  name: String;
  description: String;
  date: String;
  venue: String;
  host: String;
  price: number | null;
  availableTickets: number | null;
  soldTickets?: number;
  categoryName?: string;
  categoryId?: number | null;
  order?: Order[];
  seats?: String[];
}
