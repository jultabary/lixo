import { Vacation } from "../../../services/Employee.dto"

export interface ListOfVacation {
    vacations: Vacation[]
}

export const ListOfVacation: React.FC<ListOfVacation> = ({ vacations }: ListOfVacation) => {
    return (
        <>
            <table>
                <tr>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Comment</th>
                </tr>
                {
                    vacations.map((vacation, i) => {
                        return (
                            <tr key={i}>
                                <td>{new Date(vacation.startDate).toDateString()}</td>
                                <td>{new Date(vacation.endDate).toDateString()}</td>
                                <td>{vacation.comment}</td>
                            </tr>
                        )
                    })
                }
            </table>
        </>
    )
}

export default ListOfVacation