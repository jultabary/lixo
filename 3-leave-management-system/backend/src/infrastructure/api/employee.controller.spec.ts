import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeController } from './employee.controller';
import { App } from '../../app';
import { FakeApp } from '../../for_test/fake_app';
import { RegisterEmployeeDto } from './employee.dto';
import {
  EmployeeRegistered,
  RegisterEmployeeCommand,
} from '../../usecases/register_employee.command';
import { EmployeeId } from '../../domain/employee';
import {
  AllEmployees,
  GetAllEmployeesQuery,
} from '../../usecases/get_all_employee.query';
import { randomUUID } from 'crypto';
import {
  GetVacationOfAnEmployeeQuery,
  VacationsResponse,
} from '../../usecases/get_vacation_of_an_employee.query';

describe('EmployeeController', () => {
  let employeeController: EmployeeController;
  let fakeApp: FakeApp;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeController],
      providers: [
        {
          provide: App,
          useFactory: () => new FakeApp(),
        },
      ],
    }).compile();

    employeeController = app.get<EmployeeController>(EmployeeController);
    fakeApp = app.get<App>(App) as unknown as FakeApp;
  });

  describe('When API [POST] /employee is called with correct body', () => {
    it('then a RegisterEmployeeCommand should have been dispatched', () => {
      // Given
      const body: RegisterEmployeeDto = {
        firstName: 'Julien',
        lastName: 'Tabary',
      };
      fakeApp.setEventToBeReturned(new EmployeeRegistered(EmployeeId.create()));

      // When
      employeeController.registerEmployee(body);

      // Then
      expect(
        fakeApp.haveBeenCalledWithCommand(
          new RegisterEmployeeCommand('Julien', 'Tabary'),
        ),
      ).toBeTruthy();
    });
  });

  describe('When API [GET] /employee is called', () => {
    it('then a GetAllEmployeesQuery should have been dispatched', () => {
      // Given
      const response: AllEmployees = {
        employees: [
          {
            id: randomUUID(),
            firstName: 'Julien',
            lastName: 'Tabary',
            isOff: true,
          },
        ],
      };
      fakeApp.setResponseToBeReturned(response);

      // When
      employeeController.getAllEmployees();

      // Then
      expect(
        fakeApp.haveBeenCalledWithQuery(new GetAllEmployeesQuery()),
      ).toBeTruthy();
    });
  });

  describe('When API [GET] /employee/:id/vacation is called', () => {
    it('then a GetVacationOfAnEmployeeQuery should have been dispatched', () => {
      // Given
      const response: VacationsResponse = {
        vacations: [
          {
            startDate: new Date().getTime(),
            endDate: new Date().getTime(),
            comment: '',
          },
        ],
      };
      fakeApp.setResponseToBeReturned(response);
      const employeeId = EmployeeId.create();

      // When
      employeeController.getVacationOfAnEmployeeEmployees(employeeId.value);

      // Then
      expect(
        fakeApp.haveBeenCalledWithQuery(
          new GetVacationOfAnEmployeeQuery(employeeId),
        ),
      ).toBeTruthy();
    });
  });
});
