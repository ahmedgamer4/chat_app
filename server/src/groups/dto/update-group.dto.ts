import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class UpdateGroupDto {
  @ApiProperty()
  @IsNotEmpty()
  messages: number[];

  @ApiProperty()
  @MinLength(3)
  @IsNotEmpty()
  users: number[];
}