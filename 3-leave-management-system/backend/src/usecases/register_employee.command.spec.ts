import {
  EmployeeRegistered,
  RegisterEmployeeCommand,
} from './register_employee.command';
import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeRepository } from '../domain/employee_repository';
import { EmployeeRepositoryInMemory } from '../infrastructure/persitence/employee_repository_in_memory';
import { Employee } from '../domain/employee';
import { App } from '../app';
import { AppModule } from '../app.module';

describe('RegisterANewEmployee', () => {
  let app: App;
  let employeeRepository: EmployeeRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.get<App>(App);
    employeeRepository = module.get<EmployeeRepositoryInMemory>(
      EmployeeRepositoryInMemory,
    );
  });

  describe('when a command RegisterAnEmployee is dispatched', () => {
    test('then a event with its id is returned', async () => {
      // Given
      const command = new RegisterEmployeeCommand('Julien', 'Tabary');

      // When
      const event = await app.dispatchCommand(command);

      // Then
      const employeeRegitered = event as unknown as EmployeeRegistered;
      const employee = await employeeRepository.findById(employeeRegitered.id);
      expect(employee).toStrictEqual(
        Employee.reconstitute(employeeRegitered.id, 'Julien', 'Tabary', []),
      );
    });
  });
});
