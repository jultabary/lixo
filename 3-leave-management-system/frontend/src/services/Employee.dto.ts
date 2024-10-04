export interface Employee {
    id: string
    firstName: string
    lastName: string
    isOff: boolean
}

export interface EmployeeWithItsVacation {
    firstName: string,
    lastName: string,
    vacations: Vacation[]
}

export interface Vacation {
    startDate: number
    endDate: number
    comment: string
}
