import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class UpdateFileDto {
  @ApiProperty()
  @IsString()
  @MinLength(1)
  name: string;
}
