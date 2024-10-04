import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeRepository } from '../domain/employee_repository';
import { EmployeeRepositoryInMemory } from '../infrastructure/persitence/employee_repository_in_memory';
import { Employee, EmployeeId } from '../domain/employee';
import { App } from '../app';
import { AppModule } from '../app.module';
import {
  SomeDaysTakenEvent,
  TakeSomeDaysOffCommand,
} from './take_some_days_off.command';
import { EmployeeNotFound } from '../domain/employee_error';
import { Vacation } from '../domain/vacation';

const ONE_DAY = 86400000;

describe('TakeSomeDaysOff', () => {
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

  describe('when a command TakeSomeDaysOff is dispatched', () => {
    test('to an employee which not exist, then an error is thrown', async () => {
      // Given
      const command = new TakeSomeDaysOffCommand(
        EmployeeId.create(),
        new Date(),
        new Date(),
        'going to Etretat',
      );

      // When
      try {
        await app.dispatchCommand(command);
        expect(false).toBeTruthy();
      } catch (e) {
        // Then
        expect(e).toStrictEqual(new EmployeeNotFound(command.employeeId));
      }
    });

    test('to an employee which exist, then an event is returned and vacation is persisted', async () => {
      // Given
      const employee = Employee.registerANewEmployee('Julien', 'Tabary');
      await employeeRepository.save(employee);
      const startDate = new Date();
      const endDate = new Date(startDate.getTime() + ONE_DAY);
      const comment = 'going to Etretat';
      const command = new TakeSomeDaysOffCommand(
        employee.id,
        startDate,
        endDate,
        comment,
      );

      // When
      const event = (await app.dispatchCommand(
        command,
      )) as unknown as SomeDaysTakenEvent;

      // Then
      expect(event.startDate).toStrictEqual(command.startDate);
      expect(event.endDate).toStrictEqual(command.endDate);
      const persistedEmployee = await employeeRepository.findById(
        command.employeeId,
      );
      expect(persistedEmployee.vacations).toStrictEqual([
        new Vacation(startDate, endDate, comment),
      ]);
    });
  });
});
