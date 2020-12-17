export interface Review {
    id: number,

    comment: string,
    rating: number
    deliveryId?: number,
    reservationId?: number,
}