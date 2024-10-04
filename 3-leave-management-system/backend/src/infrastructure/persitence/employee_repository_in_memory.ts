import { Injectable } from '@nestjs/common';
import { Employee, EmployeeId } from '../../domain/employee';
import { EmployeeRepository } from '../../domain/employee_repository';
import { EmployeeQueryRepository } from '../../usecases/employee_query_repository';
import { EmployeeWithLeaveStatusResponse } from '../../usecases/get_all_employee.query';
import { VacationResponse } from '../../usecases/get_vacation_of_an_employee.query';

@Injectable()
export class EmployeeRepositoryInMemory
  implements EmployeeRepository, EmployeeQueryRepository
{
  persisted_employees: Employee[];

  constructor() {
    this.persisted_employees = [];
  }

  async findById(employeeId: EmployeeId): Promise<Employee | undefined> {
    return new Promise((resolve) => {
      resolve(
        this.persisted_employees.find(
          (employee) => employee.id.value === employeeId.value,
        ),
      );
    });
  }

  async save(newEmployee: Employee): Promise<void> {
    const employeeFound = this.persisted_employees.find(
      (employee) => employee.id.value === newEmployee.id.value,
    );
    if (!employeeFound) {
      this.persisted_employees.push(newEmployee);
    }
  }

  async findAllEmployees(): Promise<EmployeeWithLeaveStatusResponse[]> {
    return new Promise((resolve) => {
      resolve(
        this.persisted_employees.map(
          (employee) =>
            new EmployeeWithLeaveStatusResponse(
              employee.id.value,
              employee.firstName,
              employee.lastName,
              this.isOff(employee),
            ),
        ),
      );
    });
  }

  async findAllVactionsOfAnEmployee(
    employeeId: EmployeeId,
  ): Promise<VacationResponse[]> {
    const employee = this.persisted_employees.find(
      (employee) => employee.id.value === employeeId.value,
    );
    return new Promise((resolve) => {
      resolve(
        employee.vacations.map(
          (vacation) =>
            new VacationResponse(
              vacation.startDate.getTime(),
              vacation.endDate.getTime(),
              vacation.comment,
            ),
        ),
      );
    });
  }

  private isOff(employee: Employee): boolean {
    const now = new Date();
    for (const vacation of employee.vacations) {
      if (
        vacation.startDate.getTime() < now.getTime() &&
        vacation.endDate.getTime() > now.getTime()
      ) {
        return true;
      }
    }
    return false;
  }
}
