import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SubmitCodeDto {
  @ApiProperty({ example: 'a12b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d', description: 'The target problem ID' })
  @IsUUID()
  @IsNotEmpty()
  problemId!: string;

  @ApiProperty({ example: 'def twoSum(nums, target):\n    return [0, 1]', description: 'Source code' })
  @IsString()
  @IsNotEmpty()
  code!: string;

  @ApiProperty({ example: 'python', description: 'Programming language name (python, java, cpp, c, javascript, typescript, go, rust)' })
  @IsString()
  @IsNotEmpty()
  language!: string;

  @ApiProperty({ example: 'contest-uuid-1234', description: 'Associated contest ID', required: false })
  @IsUUID()
  @IsOptional()
  contestId?: string;
}
