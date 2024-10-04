import { createContext, useContext } from "react"

export interface EmployeeCommandsContextType {
    registerEmployee: (fistName: string, lastName: string) => Promise<void>
    takeSomeDayOff: (id: string, startDate: Date, endDate: Date, comment: string) => Promise<void>
}


export const EmployeeCommandsContext = createContext<EmployeeCommandsContextType>({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    registerEmployee: (_fistName: string, _lastName: string) => {
        throw new Error('registerEmployee not implemented')
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    takeSomeDayOff: (_id: string, _startDate: Date, _endDate: Date, _comment: string) => {
        throw new Error('takeSomeDayOff not implemented')
    }
})

export const useEmployeeCommands = (): EmployeeCommandsContextType => {
    const dependencies = useContext<EmployeeCommandsContextType>(EmployeeCommandsContext)
    return { ...dependencies }
}