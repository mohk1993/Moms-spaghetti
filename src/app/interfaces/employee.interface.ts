export interface Employee {
    id: number,

    email: string,
    name: string,
    surname: string,

    phoneNumber: string,
    address: string,

    dateOfBirth: Date,
    
    bankAccount: string,
    salary: number,
    workload: number

    createdAt: Date,
}