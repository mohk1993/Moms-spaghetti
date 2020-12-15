export interface PopularDish {
    id: number,

    name: string,
    description: string,    

    keto: boolean,

    price: number,
    profitMargin: number,
    quantity: number,
    quantityOrdered: number,
    numberOfTimesOrdered: number,
    
    alcoholContent: number,

    vegan: boolean,
    vegetarian: boolean,
    nutritionalInformation: string,
    allergenInformation: string,
}