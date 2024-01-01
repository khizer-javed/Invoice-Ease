import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './modules/user/user.module';
import { GlobalDbModule } from './modules/global-db/global-db.module';
import { RoleModule } from './modules/role/role.module';
import { CompanyModule } from './modules/company/company.module';

@Module({
  imports: [
    GlobalDbModule,
    AuthModule,
    DatabaseModule,
    RoleModule,
    UserModule,
    CompanyModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}