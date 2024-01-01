import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Logger,
  ValidationPipe,
  Put,
  Headers,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetLoggedInUser } from '../auth/decorators/get-logged-in-user.decorator';
// import { AgencyGuard } from '../auth/guards/agency.guard';
// import { HasPermission } from '../auth/decorators/has-permissions.decorator';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { CompanyUserService } from './company-user.service';
import { CreateCompanyUserDto } from './dto/create-company-user.dto';
import { UpdateCompanyUserDto } from './dto/update-company-user.dto';
import {
  ALL,
  ANY,
} from 'src/constants/permissions';

@UseGuards(AuthGuard())
@Controller('companies')
export class CompanyUserController {
  private logger = new Logger('CompanyUserController');
  constructor(private readonly companyUserService: CompanyUserService) {}

  @Post()
  create() {
    return 'create'
  }

  @Get()
  findAll() {
    return 'getAll'
  }

  @Get(':id')
  findOne() {
    return 'getOne'
  }

  @Put(':id')
  update() {
    return 'update'
  }

  @Delete(':id')
  remove() {
    return 'Delete'
  }
}
