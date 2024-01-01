import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Op } from 'sequelize';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { UserService } from '../user/user.service';
import { GlobalDbService } from '../global-db/global-db.service';
const _ = require('lodash');

@Injectable()
export class CompanyService {
  private logger = new Logger('CompanyService');
  constructor(
    private readonly DB: GlobalDbService,
    private readonly userService: UserService,
  ) {}

}
