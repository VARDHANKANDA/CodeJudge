import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'user@example.com', description: 'User email' })
  @IsEmail({}, { message: 'Please enter a valid email address' })
  @IsNotEmpty()
  email!: string;

  @ApiProperty({ example: 'SecurePassword123', description: 'User password' })
  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password!: string;
}
