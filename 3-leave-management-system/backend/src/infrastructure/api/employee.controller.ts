import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { App } from '../../app';
import { RegisterEmployeeDto } from './employee.dto';
import { RegisterEmployeeCommand } from '../../usecases/register_employee.command';
import {
  AllEmployees,
  EmployeeWithLeaveStatusResponse,
  GetAllEmployeesQuery,
} from '../../usecases/get_all_employee.query';
import {
  GetVacationOfAnEmployeeQuery,
  VacationResponse,
  VacationsResponse,
} from '../../usecases/get_vacation_of_an_employee.query';
import { UUID } from 'crypto';
import { EmployeeId } from '../../domain/employee';
import { ApiBody, ApiResponse } from '@nestjs/swagger';

@Controller('/employee')
export class EmployeeController {
  constructor(private readonly app: App) {}

  @Post()
  @ApiBody({
    description: 'Employee personnal information',
    required: true,
    isArray: false,
    type: RegisterEmployeeDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Employee registered.',
  })
  async registerEmployee(
    @Body() registerEmployeeDto: RegisterEmployeeDto,
  ): Promise<string> {
    const event = await this.app.dispatchCommand(
      new RegisterEmployeeCommand(
        registerEmployeeDto.firstName,
        registerEmployeeDto.lastName,
      ),
    );
    return JSON.stringify(event);
  }

  @Get()
  async getAllEmployees(): Promise<EmployeeWithLeaveStatusResponse[]> {
    const response = (await this.app.dispatchQuery(
      new GetAllEmployeesQuery(),
    )) as AllEmployees;
    return response.employees;
  }

  @Get(':employeeId/vacation')
  async getVacationOfAnEmployeeEmployees(
    @Param('employeeId') id: UUID,
  ): Promise<VacationResponse[]> {
    const response = (await this.app.dispatchQuery(
      new GetVacationOfAnEmployeeQuery(EmployeeId.reconstitute(id)),
    )) as VacationsResponse;
    return response.vacations;
  }
}
