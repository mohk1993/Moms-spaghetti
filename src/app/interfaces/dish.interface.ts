export interface Dish {
    id: number,

    name: string,
    description: string,    

    keto: boolean,

    price: number,
    profitMargin: number,
    quantity: number,
    
    alcoholContent: number,

    vegan: boolean,
    vegetarian: boolean,
    nutritionalInformation: string,
    allergenInformation: string,
}