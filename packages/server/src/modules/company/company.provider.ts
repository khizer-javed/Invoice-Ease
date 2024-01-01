import { REPOSITORIES } from 'src/constants/repositories';
import { Company } from './entities/company.entity';

export const companyProvider = [
  {
    provide: REPOSITORIES.COMPANY_REPOSITORY,
    useValue: Company,
  },
];
