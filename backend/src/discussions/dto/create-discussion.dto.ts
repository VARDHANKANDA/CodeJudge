import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDiscussionDto {
  @ApiProperty({ example: 'Optimal strategy for Two Sum using HashMaps', description: 'Discussion thread title' })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({ example: 'Here is a detailed explanation of O(N) time complexity...', description: 'Markdown thread content' })
  @IsString()
  @IsNotEmpty()
  content!: string;

  @ApiProperty({ example: 'Tutorial', description: 'Thread category (General, Tutorial, Contests, Help)', required: false })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiProperty({ example: 'problem-uuid-1234', description: 'Link to a specific problem', required: false })
  @IsUUID()
  @IsOptional()
  problemId?: string;
}
