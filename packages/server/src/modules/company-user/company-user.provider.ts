import { REPOSITORIES } from 'src/constants/repositories';
import { CompanyUser } from './entities/company-users.entity';

export const companyUserProvider = [
  {
    provide: REPOSITORIES.COMPANY_USERS_REPOSITORY,
    useValue: CompanyUser,
  },
];
