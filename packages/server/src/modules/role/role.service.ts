import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Op } from 'sequelize';
import { GlobalDbService } from '../global-db/global-db.service';
const helpers = require('../../helpers');

@Injectable()
export class RoleService {
  private logger = new Logger('RoleService');
  constructor(private readonly DB: GlobalDbService) {}

}
