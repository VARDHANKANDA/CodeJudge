import { IsBoolean, IsEnum, IsInt, IsJSON, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';
import { Difficulty } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProblemDto {
  @ApiProperty({ example: 'Two Sum', description: 'Title of the problem' })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({ example: 'two-sum', description: 'Unique url-friendly slug' })
  @IsString()
  @IsNotEmpty()
  slug!: string;

  @ApiProperty({ example: 'Find two indices that sum up to target...', description: 'Markdown description' })
  @IsString()
  @IsNotEmpty()
  description!: string;

  @ApiProperty({ example: 'EASY', enum: Difficulty, description: 'Problem difficulty' })
  @IsEnum(Difficulty)
  @IsNotEmpty()
  difficulty!: Difficulty;

  @ApiProperty({ example: 2000, description: 'Execution time limit in milliseconds' })
  @IsInt()
  @Min(100)
  timeLimit!: number;

  @ApiProperty({ example: 256, description: 'Memory limit in MB' })
  @IsInt()
  @Min(8)
  memoryLimit!: number;

  @ApiProperty({ example: 'Constraints: 2 <= nums.length <= 10^4', description: 'Markdown constraints' })
  @IsString()
  @IsNotEmpty()
  constraints!: string;

  @ApiProperty({
    example: { python: 'def twoSum(nums, target):\n    pass', cpp: 'class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        \n    }\n};' },
    description: 'Code templates by language'
  })
  codeTemplates!: any;

  @ApiProperty({ example: '[2,7,11,15]\n9', description: 'Sample standard input' })
  @IsString()
  @IsNotEmpty()
  sampleInput!: string;

  @ApiProperty({ example: '[0,1]', description: 'Sample standard output' })
  @IsString()
  @IsNotEmpty()
  sampleOutput!: string;

  @ApiProperty({ example: false, description: 'Whether it is restricted to premium users', required: false })
  @IsBoolean()
  @IsOptional()
  isPremium?: boolean;

  @ApiProperty({ example: 100, description: 'Points awarded on completion', required: false })
  @IsInt()
  @IsOptional()
  points?: number;
}
