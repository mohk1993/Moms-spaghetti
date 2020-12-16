import { Delivery } from './delivery.interface';
import { Dish } from './dish.interface';
import { Order_dish } from './order_dish.interface';

export interface Order {
    id: number,
    orderNumber: string,
    status: string,
    price: number

    dishes: Array<Dish>
    delivery:Delivery
    orderDishes:Array<Order_dish>
    comment: string,
}