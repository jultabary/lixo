import { useLocation } from "react-router-dom"
import { useEmployeeQueries } from "../../context/useEmployeeQueries";
import { useEffect, useRef, useState } from "react";
import { EmployeeWithItsVacation } from "../../services/Employee.dto";
import ListOfVacation from "./ListOfVacation/ListOfVacation";
import Button from "../../atom/Button";
import { useEmployeeCommands } from "../../context/useEmployeeCommands";

const getIdFromPath = (path: string): string => {
    const levels = path.split('/');
    return levels[levels.length - 1]
}

const EmployeeDetails: React.FC =  () => {
    const [employee, setEmployee] = useState<EmployeeWithItsVacation | null>(null)
    const location = useLocation()
    const formRef = useRef<HTMLFormElement>(null)
    const startDateRef = useRef<HTMLInputElement>(null)
    const endDateRef = useRef<HTMLInputElement>(null)
    const commentRef = useRef<HTMLInputElement>(null)
    const id = getIdFromPath(location.pathname)
    const { getEmployee, getVacationsOfAnEmployee } = useEmployeeQueries()
    const { takeSomeDayOff } = useEmployeeCommands()

    const getEmployeeWithItsVacations = async () => {
        const employee = getEmployee(id)
        const vacations = await getVacationsOfAnEmployee(id)
        setEmployee({
            firstName: employee.firstName,
            lastName: employee.lastName,
            vacations
        })
    }

    const onSubmitTakeSomeDaysOff = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        const startDate = new Date(startDateRef.current?.valueAsNumber as number)
        const endDate = new Date(endDateRef.current?.valueAsNumber as number)
        const comment = commentRef.current?.value as string
        await takeSomeDayOff(id, startDate, endDate, comment)
        await getEmployeeWithItsVacations()
    }

    useEffect(() => {
        getEmployeeWithItsVacations()
        formRef.current?.addEventListener('submit', async (e) => {
            e.preventDefault();
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location])

    return (
        <>
        { 
            employee !== null && (
                <>
                    <div>
                        <h1>Employee Details</h1>
                    </div>
                    <div>
                        <h2>Information</h2>
                        <ol>
                            <li>
                                <p>FirstName: {employee.firstName}</p>
                            </li>
                            <li>
                                <p>LastName: {employee.lastName}</p>
                            </li>
                        </ol>
                    </div>
                    <div>
                        <h2>Vacation</h2>
                        <div>
                            <form
                                id='vacation-register-form'
                                onSubmit={onSubmitTakeSomeDaysOff}
                                aria-label={'take some days'}
                                ref={formRef}
                            >
                                <div>
                                    <label htmlFor="start-date">Start date</label>
                                    <input 
                                        id="start-date"
                                        type="date"
                                        required={true}
                                        aria-require='true'
                                        ref={startDateRef}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="end-date">End date</label>
                                    <input
                                        id="end-date"
                                        type="date"
                                        required={true}
                                        aria-require='true'
                                        ref={endDateRef}
                                    />
                                </div>
                                <div>
                                    <label>Add a comment</label>
                                    <input
                                        id="comment"
                                        type="text"
                                        required={true}
                                        aria-require='true'
                                        ref={commentRef}
                                    />
                                </div>
                                <div>
                                    <Button text="Take" type="submit" classNames={""}/>
                                </div>
                            </form>
                        </div>
                        <ListOfVacation vacations={employee.vacations} />
                    </div>
                </>
            )
        }
        </>
    )
}

export default EmployeeDetails