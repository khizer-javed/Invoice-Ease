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
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import {
  ALL,
  ANY,
} from 'src/constants/permissions';

@UseGuards(AuthGuard())
@Controller('companies')
export class CompanyController {
  private logger = new Logger('CompanyController');
  constructor(private readonly companyService: CompanyService) {}

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
