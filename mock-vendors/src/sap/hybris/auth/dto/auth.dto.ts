import { Optional } from '@nestjs/common'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsObject, IsString } from 'class-validator'

export class AuthDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string

  @ApiPropertyOptional()
  @IsString()
  @Optional()
  firstName?: string

  @ApiPropertyOptional()
  @IsString()
  @Optional()
  lastName?: string

  @ApiPropertyOptional()
  @Optional()
  other?: object
}
