import { EmployeeId } from '../domain/employee';
import { EmployeeWithLeaveStatusResponse } from './get_all_employee.query';
import { VacationResponse } from './get_vacation_of_an_employee.query';

export interface EmployeeQueryRepository {
  findAllVactionsOfAnEmployee(
    employeeId: EmployeeId,
  ): Promise<VacationResponse[]>;
  findAllEmployees(): Promise<EmployeeWithLeaveStatusResponse[]>;
}
