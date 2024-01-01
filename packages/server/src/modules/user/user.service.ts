import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import * as moment from 'moment-timezone';
import * as bcrypt from 'bcryptjs';
import * as _ from 'lodash';
import { GlobalDbService } from '../global-db/global-db.service';
import { UNIQUE_KEY_VIOLATION } from 'src/constants';

@Injectable()
export class UserService {
  private logger = new Logger('UserService');
  constructor(
    private readonly DB: GlobalDbService,
  ) {}
  
}
