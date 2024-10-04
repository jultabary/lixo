import { UUID, randomUUID } from 'crypto';
import { Vacation } from './vacation';
import { WrongVacationDates } from './employee_error';

export class EmployeeId {
  value: UUID;

  constructor(value: UUID) {
    this.value = value;
  }

  static create(): EmployeeId {
    return new EmployeeId(randomUUID());
  }

  static reconstitute(valeur: UUID): EmployeeId {
    return new EmployeeId(valeur);
  }
}

export class Employee {
  id: EmployeeId;
  firstName: string;
  lastName: string;
  vacations: Vacation[];

  constructor(
    id: EmployeeId,
    firstName: string,
    lastName: string,
    vacations: Vacation[],
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.vacations = vacations;
  }

  static registerANewEmployee(firstName: string, lastName: string): Employee {
    return new Employee(EmployeeId.create(), firstName, lastName, []);
  }

  static reconstitute(
    id: EmployeeId,
    firstName: string,
    lastName: string,
    vacations: Vacation[],
  ): Employee {
    return new Employee(id, firstName, lastName, vacations);
  }

  takeSomeDaysOff(startDate: Date, endDate: Date, comment: string): void {
    if (startDate.getTime() > endDate.getTime()) {
      throw new WrongVacationDates();
    }
    this.vacations.push(new Vacation(startDate, endDate, comment));
  }
}
