import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTestCaseDto {
  @ApiProperty({ example: '[2,7,11,15]\n9', description: 'Standard input for the test case' })
  @IsString()
  @IsNotEmpty()
  input!: string;

  @ApiProperty({ example: '[0,1]', description: 'Expected standard output' })
  @IsString()
  @IsNotEmpty()
  expectedOutput!: string;

  @ApiProperty({ example: false, description: 'True if it is a hidden system testcase' })
  @IsBoolean()
  @IsNotEmpty()
  isHidden!: boolean;

  @ApiProperty({ example: 1, description: 'Ordering index', required: false })
  @IsInt()
  @IsOptional()
  order?: number;
}
