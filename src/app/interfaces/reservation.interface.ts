export interface Reservation {
    "id": number,
    "orderId": number,
    "reviewId": number,
    "calendarUuid": string,
    "customerId": number,

    "comment": string,
    "numberOfPeople": number,
    "specialOccasion": boolean,

    "startTime": Date,
    "endTime": Date,

    "createdAt": Date
}