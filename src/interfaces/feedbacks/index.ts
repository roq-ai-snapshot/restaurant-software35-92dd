import { UsersInterface } from 'interfaces/users';
import { RestaurantsInterface } from 'interfaces/restaurants';

export interface FeedbacksInterface {
  id?: string;
  customer_id?: string;
  restaurant_id?: string;
  rating: number;
  review?: string;
  created_at: Date;

  users?: UsersInterface;
  restaurants?: RestaurantsInterface;
}
