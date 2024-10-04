import { Employee, Vacation } from "./Employee.dto";

export const BASE_URL = 'http://localhost:3000'

export class EmployeeApiService {

    async getAllEmployees(): Promise<Employee[]> {
        const response = await fetch(`${BASE_URL}/employee`)
         return  response.json() as Promise<Employee[]>
    }

    async getVacationsOfAnEmployee(id: string): Promise<Vacation[]> {
        const response = await fetch(`${BASE_URL}/employee/${id}/vacation`)
         return  response.json() as Promise<Vacation[]>
    }

    async registerANewEmployee(firstName: string, lastName: string): Promise<void> {
        await fetch(
            `${BASE_URL}/employee`,
            {
                method: 'POST',
                headers: [
                    ['Content-Type', 'application/json']
                ],
                body: JSON.stringify({ firstName, lastName })
            }
        )
    }

    async takeSomeDaysOff(employeeId: string, startDate: Date, endDate: Date, comment: string): Promise<void> {
        await fetch(
            `${BASE_URL}/employee/${employeeId}/vacation`,
            {
                method: 'POST',
                headers: [
                    ['Content-Type', 'application/json']
                ],
                body: JSON.stringify({ startDate: startDate.getTime(), endDate: endDate.getTime(), comment })
            }
        )
    }
}