import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';
export class AuthCredentialsDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  @IsOptional()
  @IsBoolean()
  rememberMe: boolean = false;
}
