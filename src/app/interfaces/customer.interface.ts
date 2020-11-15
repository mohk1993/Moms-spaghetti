export interface Customer {
    id: number,

    email: string,
    name: string,
    surname: string

    gender: string,
    dateOfBirth: Date,

    allergens: string,

    phoneNumber: string,
    address: string,

    createdAt: Date,
}