import {
  Query,
  QueryHandler,
  Response,
} from '../building_blocks/query_handler';
import { EmployeeId } from '../domain/employee';
import { EmployeeQueryRepository } from './employee_query_repository';

export class GetVacationOfAnEmployeeQuery implements Query {
  constructor(readonly employeeId: EmployeeId) {}
}

export class VacationResponse {
  constructor(
    readonly startDate: number,
    readonly endDate: number,
    readonly comment: string,
  ) {}
}

export class VacationsResponse implements Response {
  constructor(readonly vacations: VacationResponse[]) {}
}

export class GetVacationOfAnEmployee
  implements QueryHandler<GetVacationOfAnEmployeeQuery, VacationsResponse>
{
  constructor(
    private readonly employeeQueryRepository: EmployeeQueryRepository,
  ) {}

  async handle(
    query: GetVacationOfAnEmployeeQuery,
  ): Promise<VacationsResponse> {
    const vacations =
      await this.employeeQueryRepository.findAllVactionsOfAnEmployee(
        query.employeeId,
      );
    return new VacationsResponse(vacations);
  }
  registeredQuery(): string {
    return GetVacationOfAnEmployeeQuery.name;
  }
}
