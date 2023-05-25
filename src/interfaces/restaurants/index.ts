import { FeedbacksInterface } from 'interfaces/feedbacks';
import { MenusInterface } from 'interfaces/menus';
import { OrdersInterface } from 'interfaces/orders';
import { ReservationsInterface } from 'interfaces/reservations';
import { UsersInterface } from 'interfaces/users';

export interface RestaurantsInterface {
  id?: string;
  owner_id?: string;
  name: string;
  location: string;
  contact_details: string;
  operating_hours: string;
  feedbacks?: FeedbacksInterface[];
  menus?: MenusInterface[];
  orders?: OrdersInterface[];
  reservations?: ReservationsInterface[];
  users?: UsersInterface;
}
