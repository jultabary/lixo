import { Injectable } from '@nestjs/common';
import {
  Command,
  CommandHandler,
  Event,
} from '../building_blocks/command_handler';
import { Employee, EmployeeId } from '../domain/employee';
import { EmployeeRepository } from '../domain/employee_repository';

export class RegisterEmployeeCommand implements Command {
  constructor(
    readonly firstName: string,
    readonly lastName: string,
  ) {
    if (!firstName || !lastName) {
      throw new Error('FistName and LastName must be defined');
    }
  }
}

export class EmployeeRegistered extends Event {
  id: EmployeeId;

  constructor(id: EmployeeId) {
    super();
    this.id = id;
  }
}

@Injectable()
export class RegisterEmployee
  implements CommandHandler<RegisterEmployeeCommand, EmployeeRegistered>
{
  constructor(private readonly employeeRepository: EmployeeRepository) {}

  async handle(command: RegisterEmployeeCommand): Promise<EmployeeRegistered> {
    const newEmployee = Employee.registerANewEmployee(
      command.firstName,
      command.lastName,
    );
    await this.employeeRepository.save(newEmployee);
    return new EmployeeRegistered(newEmployee.id);
  }

  registeredCommand(): string {
    return RegisterEmployeeCommand.name;
  }
}
