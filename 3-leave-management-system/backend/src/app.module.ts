import { Module } from '@nestjs/common';
import { EmployeeRepositoryInMemory } from './infrastructure/persitence/employee_repository_in_memory';
import { EmployeeRepository } from './domain/employee_repository';
import { App } from './app';
import { EmployeeController } from './infrastructure/api/employee.controller';
import { EmployeeQueryRepository } from './usecases/employee_query_repository';

@Module({
  imports: [],
  controllers: [EmployeeController],
  providers: [
    EmployeeRepositoryInMemory,
    {
      provide: App,
      useFactory: (
        employeeRepository: EmployeeRepository,
        employeeQueryRepository: EmployeeQueryRepository,
      ) => new App(employeeRepository, employeeQueryRepository),
      inject: [EmployeeRepositoryInMemory, EmployeeRepositoryInMemory],
    },
  ],
})
export class AppModule {}
