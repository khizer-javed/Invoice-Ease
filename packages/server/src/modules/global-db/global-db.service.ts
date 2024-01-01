import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import * as moment from 'moment-timezone';
import { REPOSITORIES } from 'src/constants/repositories';
import { UNIQUE_KEY_VIOLATION } from 'src/constants';
import { ForgotPassword } from '../auth/entities/forgot-password.entity';
import { LoginToken } from '../auth/entities/login-token.entity';
import { Permission } from '../role/entities/permission.entity';
import { Role } from '../role/entities/role.entity';
import { RolePermission } from '../role/entities/role-permission.entity';
import { SuperUser } from '../user/entities/super-user.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class GlobalDbService {
  private logger = new Logger('GlobalDbService');
  public repo: any = {};
  constructor(
    @Inject(REPOSITORIES.USER_REPOSITORY)
    private readonly userRepository: typeof User,
    @Inject(REPOSITORIES.LOGIN_TOKEN_REPOSITORY)
    private readonly loginTokenRepository: typeof LoginToken,
    @Inject(REPOSITORIES.FORGOT_PASSWORD_REPOSITORY)
    private readonly forgotPasswordRepository: typeof ForgotPassword,
    @Inject(REPOSITORIES.SUPER_USER_REPOSITORY)
    private readonly superUserRepository: typeof SuperUser,
    @Inject(REPOSITORIES.ROLE_REPOSITORY)
    private readonly RoleRepository: typeof Role,
    @Inject(REPOSITORIES.ROLE_PERMISSION_REPOSITORY)
    private readonly RolePermissionRepository: typeof RolePermission,
    @Inject(REPOSITORIES.PERMISSION_REPOSITORY)
    private readonly PermissionRepository: typeof Permission,
    @Inject(REPOSITORIES.COMPANY_REPOSITORY)
    private readonly companyRepository: typeof Permission,
  ) {
    this.repo['User'] = this.userRepository;
    this.repo['LoginToken'] = this.loginTokenRepository;
    this.repo['ForgotPassword'] = this.forgotPasswordRepository;
    this.repo['SuperUser'] = this.superUserRepository;
    this.repo['Role'] = this.RoleRepository;
    this.repo['RolePermission'] = this.RolePermissionRepository;
    this.repo['Permission'] = this.PermissionRepository;
    this.repo['Company'] = this.companyRepository;
  }

  async getOne(model: string, params: any) {
    const filter = params;
    const result = await this.repo[model].findOne({ where: filter });
    return result;
  }

  async getAll(model: string, params: any) {
    const filter = params;
    return await this.repo[model].findAndCountAll({ where: filter });
  }

  async save(model: string, dto: any, loggedInUser: any, transaction = null) {
    if (transaction) {
      try {
        const { id } = dto;
        if (id) {
          // Update
          dto.updatedBy = loggedInUser.user.id;
          await this.repo[model].update(dto, {
            where: { id },
            transaction,
          });
          return await this.repo[model].findOne({ where: { id } });
        } else {
          // Create
          dto.createdBy = loggedInUser.user.id;
          return await this.repo[model].create(dto, { transaction });
        }
      } catch (e) {
        this.logger.error('Error while saving ', e);
        if (e.parent.code === UNIQUE_KEY_VIOLATION) {
          throw e;
        } else {
          throw new InternalServerErrorException();
        }
      }
    } else {
      try {
        const { id } = dto;
        if (id) {
          // Update
          dto.updatedBy = loggedInUser.user.id;
          await this.repo[model].update(dto, {
            where: { id },
          });
          return await this.repo[model].findOne({ where: { id } });
        } else {
          // Create
          dto.createdBy = loggedInUser.user.id;
          return await this.repo[model].create(dto);
        }
      } catch (e) {
        this.logger.error('Error while saving ', e);
        if (e.parent.code === UNIQUE_KEY_VIOLATION) {
          throw e;
        } else {
          throw new InternalServerErrorException();
        }
      }
    }
  }

  async delete(
    model: string,
    filter: any,
    loggedInUser: any = false,
    transaction = null,
  ) {
    if (transaction) {
      try {
        if (loggedInUser) {
          this.repo[model].destroy({ where: filter, transaction });
          const dto = {
            updatedBy: loggedInUser.user.id,
          };
          await this.repo[model].update(dto, { where: filter, transaction });
        }
        return await this.repo[model].destroy({ where: filter, transaction });
      } catch (e) {
        this.logger.error('Error while deleting ', e);
        throw new InternalServerErrorException();
      }
    } else {
      try {
        if (loggedInUser) {
          this.repo[model].destroy({ where: filter });
          const dto = {
            updatedBy: loggedInUser.user.id,
          };
          await this.repo[model].update(dto, { where: filter });
        }
        return await this.repo[model].destroy({ where: filter });
      } catch (e) {
        this.logger.error('Error while deleting ', e);
        throw new InternalServerErrorException();
      }
    }
  }
}
