import { ApiProperty } from '@nestjs/swagger';

export class RegisterEmployeeDto {
  @ApiProperty({
    description: 'firstName',
    required: true,
  })
  firstName: string;
  @ApiProperty({
    description: 'lastName',
    required: true,
  })
  lastName: string;
}

export class TakeSomeDaysOff {
  @ApiProperty({
    description: 'start date in timestamp',
    required: true,
  })
  startDate: number;
  @ApiProperty({
    description: 'end date in timestamp',
    required: true,
  })
  endDate: number;
  @ApiProperty({
    required: true,
  })
  comment: string;
}
