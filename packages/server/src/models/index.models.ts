import { User } from 'src/modules/user/entities/user.entity';
import { SuperUser } from 'src/modules/user/entities/super-user.entity';
import { LoginToken } from 'src/modules/auth/entities/login-token.entity';
import { ForgotPassword } from 'src/modules/auth/entities/forgot-password.entity';
import { Role } from 'src/modules/role/entities/role.entity';
import { RolePermission } from 'src/modules/role/entities/role-permission.entity';
import { Permission } from 'src/modules/role/entities/permission.entity';
import { Company } from 'src/modules/company/entities/company.entity';

const models = [
  User,
  SuperUser,
  LoginToken,
  ForgotPassword,
  Role,
  RolePermission,
  Permission,
  Company
];

export const appModels = models;