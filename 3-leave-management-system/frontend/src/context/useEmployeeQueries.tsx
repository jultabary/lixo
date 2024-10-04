import { createContext, useContext } from "react"
import { Employee, Vacation } from "../services/Employee.dto"

export interface EmployeeQueriesContextType {
    getAllEmployees: () => Employee[]
    getVacationsOfAnEmployee: (id: string) => Promise<Vacation[]>
    getEmployee: (id: string) => Employee
}


export const EmployeeQueriesContext = createContext<EmployeeQueriesContextType>({
    getAllEmployees: () => {
        throw new Error('getAllEmployee not implemented')
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getVacationsOfAnEmployee: (_id: string) => {
        throw new Error('getVactionOfAnEmployee not implemented')
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getEmployee: (_id: string) => {
        throw new Error('getEmployee not implemented') 
    }
})

export const useEmployeeQueries = (): EmployeeQueriesContextType => {
    const dependencies = useContext<EmployeeQueriesContextType>(EmployeeQueriesContext)
    return { ...dependencies }
}