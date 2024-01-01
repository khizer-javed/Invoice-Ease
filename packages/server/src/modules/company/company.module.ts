import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { AuthModule } from '../auth/auth.module';
import { companyProvider } from './company.provider';
import { UserModule } from '../user/user.module';

@Module({
  imports: [AuthModule, UserModule],
  controllers: [CompanyController],
  providers: [CompanyService, ...companyProvider],
})
export class CompanyModule {}
