import { Module } from '@nestjs/common';
import { CompanyUserService } from './company-user.service';
import { CompanyUserController } from './company-user.controller';
import { AuthModule } from '../auth/auth.module';
import { companyUserProvider } from './company-user.provider';
import { UserModule } from '../user/user.module';

@Module({
  imports: [AuthModule, UserModule],
  controllers: [CompanyUserController],
  providers: [CompanyUserService, ...companyUserProvider],
})
export class CompanyModule {}
