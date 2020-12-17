export interface Delivery{
    id: number,
    orderId: number,
    reviewId: number

    comment: string,
    location: string,

    deliveryStatus: string,
    deliveryType: string,

    deliveryCompleteTime: string,
    requestedDeliveryTime: string,

    createdAt: string,
}