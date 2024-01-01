import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Op } from 'sequelize';
import { CreateCompanyUserDto } from './dto/create-company-user.dto';
import { UpdateCompanyUserDto } from './dto/update-company-user.dto';
import { UserService } from '../user/user.service';
import { GlobalDbService } from '../global-db/global-db.service';
const _ = require('lodash');

@Injectable()
export class CompanyUserService {
  private logger = new Logger('CompanyService');
  constructor(
    private readonly DB: GlobalDbService,
    private readonly userService: UserService,
  ) {}

}
