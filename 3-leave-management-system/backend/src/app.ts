import { Injectable } from '@nestjs/common';
import { Command, CommandHandler } from './building_blocks/command_handler';
import { Query, QueryHandler, Response } from './building_blocks/query_handler';
import { EmployeeRepository } from './domain/employee_repository';
import { RegisterEmployee } from './usecases/register_employee.command';
import { TakeSomeDaysOff } from './usecases/take_some_days_off.command';
import { EmployeeQueryRepository } from './usecases/employee_query_repository';
import { GetAllEmployees } from './usecases/get_all_employee.query';
import { GetVacationOfAnEmployee } from './usecases/get_vacation_of_an_employee.query';

@Injectable()
export class App {
  commandHandlers: CommandHandler<any, any>[];
  queryHandlers: QueryHandler<any, any>[];

  constructor(
    employeeRepository: EmployeeRepository,
    employeeQueryRepository: EmployeeQueryRepository,
  ) {
    this.commandHandlers = [];
    this.commandHandlers.push(new RegisterEmployee(employeeRepository));
    this.commandHandlers.push(new TakeSomeDaysOff(employeeRepository));
    this.queryHandlers = [];
    this.queryHandlers.push(new GetAllEmployees(employeeQueryRepository));
    this.queryHandlers.push(
      new GetVacationOfAnEmployee(employeeQueryRepository),
    );
  }

  async dispatchCommand(command: Command): Promise<Event> {
    const associatedHandler = this.commandHandlers.find(
      (commandHandler) =>
        commandHandler.registeredCommand() === command.constructor.name,
    );
    const begin = new Date();
    console.log(
      `Command [${command.constructor.name}] [${JSON.stringify(command)}] is handling`,
    );
    try {
      const event = await associatedHandler.handle(command);
      const end = new Date();
      const duration = end.getTime() - begin.getTime();
      console.log(
        `Command [${command.constructor.name}] [${JSON.stringify(command)}] has been handled in ${duration} ms and returned ${JSON.stringify(event)}`,
      );
      return event;
    } catch (e) {
      console.error(
        `An error occured when handling Command [${command.constructor.name}] [${JSON.stringify(command)}]`,
        e,
      );
      throw e;
    }
  }

  async dispatchQuery(query: Query): Promise<Response> {
    const associatedHandler = this.queryHandlers.find(
      (queryHandler) =>
        queryHandler.registeredQuery() === query.constructor.name,
    );
    const begin = new Date();
    console.log(
      `Query [${query.constructor.name}] [${JSON.stringify(query)}] is handling`,
    );
    try {
      const response = await associatedHandler.handle(query);
      const end = new Date();
      const duration = end.getTime() - begin.getTime();
      console.log(
        `Query [${query.constructor.name}] [${JSON.stringify(query)}] has been handled in ${duration} ms and returned ${JSON.stringify(response)}`,
      );
      return response;
    } catch (e) {
      console.error(
        `An error occured when handling Query [${query.constructor.name}] [${JSON.stringify(query)}]`,
        e,
      );
      throw e;
    }
  }
}
