import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ValidationPipe,
  UseGuards,
  Logger,
  Headers,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@UseGuards(AuthGuard())
@Controller('users')
export class UserController {
  private logger = new Logger('UserController');
  constructor(private readonly userService: UserService) {}

}
