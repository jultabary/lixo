import {
  Command,
  Event,
  CommandHandler,
} from '../building_blocks/command_handler';
import { EmployeeId } from '../domain/employee';
import { EmployeeRepository } from '../domain/employee_repository';
import { EmployeeNotFound } from '../domain/employee_error';

export class TakeSomeDaysOffCommand implements Command {
  constructor(
    readonly employeeId: EmployeeId,
    readonly startDate: Date,
    readonly endDate: Date,
    readonly comment: string,
  ) {}
}

export class SomeDaysTakenEvent extends Event {
  constructor(
    readonly startDate: Date,
    readonly endDate: Date,
  ) {
    super();
  }
}

export class TakeSomeDaysOff
  implements CommandHandler<TakeSomeDaysOffCommand, SomeDaysTakenEvent>
{
  constructor(private readonly employeeRepository: EmployeeRepository) {}

  async handle(command: TakeSomeDaysOffCommand): Promise<SomeDaysTakenEvent> {
    const employee = await this.employeeRepository.findById(command.employeeId);
    if (employee === undefined) {
      throw new EmployeeNotFound(command.employeeId);
    }
    employee.takeSomeDaysOff(
      command.startDate,
      command.endDate,
      command.comment,
    );
    await this.employeeRepository.save(employee);
    return new SomeDaysTakenEvent(command.startDate, command.endDate);
  }

  registeredCommand(): string {
    return TakeSomeDaysOffCommand.name;
  }
}
