import { Test, TestingModule } from '@nestjs/testing';
import { App } from '../app';
import { AppModule } from '../app.module';
import {
  AllEmployees,
  EmployeeWithLeaveStatusResponse,
  GetAllEmployeesQuery,
} from './get_all_employee.query';
import { Employee } from '../domain/employee';
import { EmployeeRepository } from '../domain/employee_repository';
import { EmployeeRepositoryInMemory } from '../infrastructure/persitence/employee_repository_in_memory';

describe('GetAllEmployees', () => {
  let app: App;
  let employeeRepository: EmployeeRepository;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.get<App>(App);
    employeeRepository = module.get<EmployeeRepository>(
      EmployeeRepositoryInMemory,
    );
  });

  describe('when a command GetAllEmployeeQuery is dispatched', () => {
    test('then all employees registered with their current presence are returned', async () => {
      // Given
      const anEmployee = Employee.registerANewEmployee('Julien', 'Tabary');
      const anotherEmployee = Employee.registerANewEmployee(
        'Stéphane',
        'Tabary',
      );
      const query = new GetAllEmployeesQuery();
      const now = new Date();
      const beforeNow = new Date(now.getTime() - 1000);
      const afterNow = new Date(now.getTime() + 1000);
      const inALongTime = new Date(now.getTime() + 100000);
      anEmployee.takeSomeDaysOff(beforeNow, afterNow, 'in vacation now');
      anotherEmployee.takeSomeDaysOff(afterNow, inALongTime, 'present now');
      employeeRepository.save(anEmployee);
      employeeRepository.save(anotherEmployee);

      // When
      const response = await app.dispatchQuery(query);

      // Then
      const allEmployees = response as unknown as AllEmployees;
      expect(allEmployees.employees).toStrictEqual([
        new EmployeeWithLeaveStatusResponse(
          anEmployee.id.value,
          'Julien',
          'Tabary',
          true,
        ),
        new EmployeeWithLeaveStatusResponse(
          anotherEmployee.id.value,
          'Stéphane',
          'Tabary',
          false,
        ),
      ]);
    });
  });
});
