import { Dish } from './dish.interface';

export interface Order {
    id: number,
    orderNumber: string,
    status: string,
    total: number

    dishes: Array<Dish>
    
    comment: string,
}