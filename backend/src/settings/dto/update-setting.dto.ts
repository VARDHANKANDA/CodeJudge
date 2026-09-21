import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateSettingDto {
  @ApiProperty({ example: 'maintenance_mode', description: 'Settings key' })
  @IsString()
  @IsNotEmpty()
  key!: string;

  @ApiProperty({ example: 'false', description: 'Settings value' })
  @IsString()
  @IsNotEmpty()
  value!: string;
}
