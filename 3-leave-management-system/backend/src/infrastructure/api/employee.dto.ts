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
