import { TransactionInterceptor } from 'src/database/transaction.interceptor';
import { REPOSITORIES } from 'src/constants/repositories';
import { ForgotPassword } from '../auth/entities/forgot-password.entity';
import { LoginToken } from '../auth/entities/login-token.entity';
import { SuperUser } from '../user/entities/super-user.entity';
import { User } from '../user/entities/user.entity';
import { Role } from '../role/entities/role.entity';
import { RolePermission } from '../role/entities/role-permission.entity';
import { Permission } from '../role/entities/permission.entity';
import { Company } from '../company/entities/company.entity';

export const globalDbProvider = [
  TransactionInterceptor,
  {
    provide: REPOSITORIES.USER_REPOSITORY,
    useValue: User,
  },
  {
    provide: REPOSITORIES.SUPER_USER_REPOSITORY,
    useValue: SuperUser,
  },
  {
    provide: REPOSITORIES.LOGIN_TOKEN_REPOSITORY,
    useValue: LoginToken,
  },
  {
    provide: REPOSITORIES.FORGOT_PASSWORD_REPOSITORY,
    useValue: ForgotPassword,
  },
  {
    provide: REPOSITORIES.ROLE_REPOSITORY,
    useValue: Role,
  },
  {
    provide: REPOSITORIES.ROLE_PERMISSION_REPOSITORY,
    useValue: RolePermission,
  },
  {
    provide: REPOSITORIES.PERMISSION_REPOSITORY,
    useValue: Permission,
  },
  {
    provide: REPOSITORIES.COMPANY_REPOSITORY,
    useValue: Company,
  },
];
