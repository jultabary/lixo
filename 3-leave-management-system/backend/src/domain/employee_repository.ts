import { Employee, EmployeeId } from './employee';

export interface EmployeeRepository {
  save(newEmployee: Employee): Promise<void>;
  findById(employeeId: EmployeeId): Promise<Employee | undefined>;
}
