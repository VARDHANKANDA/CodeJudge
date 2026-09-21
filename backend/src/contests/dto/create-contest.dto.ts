import { IsBoolean, IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateContestDto {
  @ApiProperty({ example: 'Code Sprints 2026', description: 'Contest title' })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({ example: 'Participate and solve 5 algorithmic problems...', description: 'Contest description' })
  @IsString()
  @IsNotEmpty()
  description!: string;

  @ApiProperty({ example: '2026-07-15T18:00:00Z', description: 'Contest start time' })
  @IsDateString()
  @IsNotEmpty()
  startTime!: string;

  @ApiProperty({ example: '2026-07-15T21:00:00Z', description: 'Contest end time' })
  @IsDateString()
  @IsNotEmpty()
  endTime!: string;

  @ApiProperty({ example: false, description: 'True if it requires registration confirmation or password input' })
  @IsBoolean()
  @IsOptional()
  isPrivate?: boolean;

  @ApiProperty({ example: 'ContestPass123', description: 'Optional access password for private contest', required: false })
  @IsString()
  @IsOptional()
  password?: string;
}
