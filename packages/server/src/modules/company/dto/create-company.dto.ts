import { IsNotEmpty } from 'class-validator';

export class CreateCompanyDto {
  @IsNotEmpty()
  company: any;

  @IsNotEmpty()
  user: any;
}
