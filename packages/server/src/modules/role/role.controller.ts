import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Headers,
  UseGuards,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
// import { HasPermission } from '../auth/decorators/has-permissions.decorator';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
// import { AgencyGuard } from '../auth/guards/agency.guard';
import { RoleService } from './role.service';
import { PermissionService } from './permission.service';
import { RolePermissionService } from './role-permission.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ALL } from 'src/constants/permissions';

@UseGuards(AuthGuard())
@Controller('roles')
export class RoleController {
  constructor(
    private readonly roleService: RoleService,
    private readonly permissionService: PermissionService,
    private readonly rolePermissionService: RolePermissionService,
  ) {}
}
