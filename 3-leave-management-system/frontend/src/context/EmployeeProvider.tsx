import { ReactElement, useEffect, useState } from "react";
import { EmployeeQueriesContext } from "./useEmployeeQueries";
import { EmployeeCommandsContext } from "./useEmployeeCommands";
import { EmployeeApiService } from "../services/Employee.api.service";
import { Employee, Vacation } from "../services/Employee.dto";

export interface EmployeeProviderProps {
    children?: React.ReactNode
    employeeServiceApi: EmployeeApiService
}

export const EmployeeProvider = ({ employeeServiceApi, children }: EmployeeProviderProps): ReactElement => {
    const [employees, setEmployees] = useState<Employee[]>([])
    const getEmployee = (id: string): Employee => {
        return employees.find(employee => employee.id === id) as Employee
    }
    const getAllEmployees = (): Employee[] => {
        return employees
    }
    const getVacationsOfAnEmployee = async (id: string): Promise<Vacation[]> => {
        return employeeServiceApi.getVacationsOfAnEmployee(id)
    }
    const registerEmployee = async (firstName: string, lastName: string): Promise<void> => {
        await employeeServiceApi.registerANewEmployee(firstName, lastName)
        const newEmployees = await employeeServiceApi.getAllEmployees()
        setEmployees(newEmployees)
    }
    const takeSomeDayOff = async (employeeId: string, startDate: Date, endDate: Date, comment: string): Promise<void> => {
        await employeeServiceApi.takeSomeDaysOff(employeeId, startDate, endDate, comment)
        const newEmployees = await employeeServiceApi.getAllEmployees()
        setEmployees(newEmployees)
    }
    useEffect(() => {
        employeeServiceApi.getAllEmployees().then(employees => setEmployees(employees))
    }, [employeeServiceApi])

    return (
        <EmployeeQueriesContext.Provider value={{
            getAllEmployees,
            getVacationsOfAnEmployee,
            getEmployee
        }}>
            <EmployeeCommandsContext.Provider value={{
                registerEmployee,
                takeSomeDayOff
            }}>
                { children }
            </EmployeeCommandsContext.Provider>
        </EmployeeQueriesContext.Provider>
    )
}