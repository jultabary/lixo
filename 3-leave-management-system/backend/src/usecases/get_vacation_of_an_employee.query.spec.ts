import { Test, TestingModule } from '@nestjs/testing';
import { App } from '../app';
import { AppModule } from '../app.module';
import { Employee } from '../domain/employee';
import { EmployeeRepository } from '../domain/employee_repository';
import { EmployeeRepositoryInMemory } from '../infrastructure/persitence/employee_repository_in_memory';
import {
  GetVacationOfAnEmployeeQuery,
  VacationResponse,
  VacationsResponse,
} from './get_vacation_of_an_employee.query';

describe('GetVacationOfAnEmployee', () => {
  let app: App;
  let employeeRepository: EmployeeRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    employeeRepository = module.get<EmployeeRepository>(
      EmployeeRepositoryInMemory,
    );
    app = module.get<App>(App);
  });

  describe('when a query GetVacationOfAnEmployee is dispatched', () => {
    test('then all vacaction periods of this employee are returned', async () => {
      // Given
      const employee = Employee.registerANewEmployee('Julien', 'Tabary');
      const startDate = new Date();
      const endDate = new Date(startDate.getTime() + 1000);
      employee.takeSomeDaysOff(startDate, endDate, 'a comment');
      employeeRepository.save(employee);

      const query = new GetVacationOfAnEmployeeQuery(employee.id);

      // When
      const response = await app.dispatchQuery(query);

      // Then
      const vacationPeriods = response as unknown as VacationsResponse;
      expect(vacationPeriods.vacations).toStrictEqual([
        new VacationResponse(
          startDate.getTime(),
          endDate.getTime(),
          'a comment',
        ),
      ]);
    });
  });
});
