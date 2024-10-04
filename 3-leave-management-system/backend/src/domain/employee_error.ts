import { EmployeeId } from './employee';

export class EmployeeNotFound extends Error {
  employeeId: EmployeeId;
  constructor(employeeId: EmployeeId) {
    super(`Employee with id [${employeeId.value}] was not found`);
    this.employeeId = employeeId;
  }
}

export class WrongVacationDates extends Error {
  constructor() {
    super('Start date is mandatory before end date');
  }
}
