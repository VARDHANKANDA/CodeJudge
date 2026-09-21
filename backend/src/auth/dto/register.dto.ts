import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'user@example.com', description: 'The email address of the user' })
  @IsEmail({}, { message: 'Please enter a valid email address' })
  @IsNotEmpty()
  email!: string;

  @ApiProperty({ example: 'coder123', description: 'Unique username for profile' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'Username must be at least 3 characters long' })
  username!: string;

  @ApiProperty({ example: 'SecurePassword123', description: 'Password' })
  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password!: string;

  @ApiProperty({ example: 'Rohan Sharma', description: 'Full name', required: false })
  @IsString()
  @IsOptional()
  name?: string;
}
