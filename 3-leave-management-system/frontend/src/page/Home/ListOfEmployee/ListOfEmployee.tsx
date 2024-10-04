import { Link } from "react-router-dom"
import { useEmployeeQueries } from "../../../context/useEmployeeQueries"
import { EMPLOYEE_PAGE } from "../../../Routes"

const ListOfEmployee: React.FC = () => {
    const { getAllEmployees } = useEmployeeQueries()
    const employees = getAllEmployees()
    return (
        <table>
            <thead>
                <tr>
                    <th>Full Name</th>
                    <th>Status</th>
                    <th>Details</th>
                </tr>
            </thead>
            <tbody>
            {
                employees.map((employee, i) => {
                    return (
                        <tr key={i}>
                            <td>{employee.firstName} {employee.lastName}</td>
                            <td>{employee.isOff ? 'OFF' : 'PRESENT'}</td>
                            <td><Link to={`${EMPLOYEE_PAGE.replace(':id', employee.id)}`}>Details</Link></td>
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
    )
}

export default ListOfEmployee