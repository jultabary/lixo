import {
  QueryHandler,
  Query,
  Response,
} from '../building_blocks/query_handler';
import { EmployeeQueryRepository } from './employee_query_repository';

export class GetAllEmployeesQuery implements Query {}
export class EmployeeWithLeaveStatusResponse {
  constructor(
    readonly id: string,
    readonly firstName: string,
    readonly lastName: string,
    readonly isOff: boolean,
  ) {}
}

export class AllEmployees implements Response {
  constructor(readonly employees: EmployeeWithLeaveStatusResponse[]) {}
}

export class GetAllEmployees
  implements QueryHandler<GetAllEmployeesQuery, AllEmployees>
{
  constructor(
    private readonly employeeQueryRepository: EmployeeQueryRepository,
  ) {}

  registeredQuery(): string {
    return GetAllEmployeesQuery.name;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async handle(_query: GetAllEmployeesQuery): Promise<AllEmployees> {
    const employees = await this.employeeQueryRepository.findAllEmployees();
    return new AllEmployees(employees);
  }
}
