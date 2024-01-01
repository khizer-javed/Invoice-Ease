import { IsNotEmpty } from 'class-validator';

export class CreateCompanyUserDto {
  @IsNotEmpty()
  company: any;

  @IsNotEmpty()
  user: any;
}
