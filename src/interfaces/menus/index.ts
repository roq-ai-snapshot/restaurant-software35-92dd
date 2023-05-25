import { MenuItemsInterface } from 'interfaces/menu-items';
import { RestaurantsInterface } from 'interfaces/restaurants';

export interface MenusInterface {
  id?: string;
  restaurant_id?: string;
  name: string;
  menu_items?: MenuItemsInterface[];
  restaurants?: RestaurantsInterface;
}
