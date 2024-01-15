import {
  Injectable,
  Inject,
  UnauthorizedException,
  InternalServerErrorException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import * as moment from 'moment-timezone';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/modules/user/entities/user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { REPOSITORIES } from 'src/constants/repositories';
import { LoginTokenService } from './login-token.service';
import { ForgotPasswordService } from './forgot-password.service';
import { AuthResetPasswordDto } from './dto/auth-reset-password.dto';
import { LoginToken } from './entities/login-token.entity';
import { UserContextService } from './user-context.service';
import { Validate } from '../../helpers/validate';
import {
  DEFAULT_ROLES,
  STRIPE_KEY,
  STRIPE_PRODUCT_ID,
  SUBSCRIPTION_STATUS,
  UNIQUE_KEY_VIOLATION,
} from 'src/constants';
import { GlobalDbService } from '../global-db/global-db.service';
import { Sequelize, Transaction } from 'sequelize';
import Stripe from 'stripe';

const dayjs = require('dayjs');
const stripe = new Stripe(STRIPE_KEY);
@Injectable()
export class AuthService {
  constructor(
    @Inject(REPOSITORIES.USER_REPOSITORY)
    private readonly userRepository: typeof User,
    @Inject(REPOSITORIES.LOGIN_TOKEN_REPOSITORY)
    private readonly loginTokenRepository: typeof LoginToken,
    @Inject(LoginTokenService)
    private readonly loginTokenService,
    @Inject(ForgotPasswordService)
    private readonly forgotPasswordService,
    @Inject(UserContextService)
    private readonly userContextService,
    private readonly validate: Validate,
    @Inject(GlobalDbService)
    private readonly DB,
  ) {}

  async login(
    authCredentialsDto: AuthCredentialsDto,
    clientInfo: any,
  ): Promise<any> {
    const user = await this.validateUserPassword(authCredentialsDto);
    if (!user) {
      return this.throwInvalidCredentialsException();
    }
    const token: any = await this.loginTokenService.generateToken(user, {
      ...clientInfo,
      rememberMe: authCredentialsDto.rememberMe,
    });
    return token;
  }

  async signUp(user: any) {
    const { password } = user;
    const userWhere: any = {};
    userWhere.username = user.username;
    const existingUser = await this.DB.getOne('User', userWhere);

    if (existingUser) {
      throw new ConflictException('Username already exists.');
    }
    user.salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(password, user.salt);

    const uerRole = await this.DB.repo.Role.findOne({
      where: { name: DEFAULT_ROLES.USER },
      raw: true,
    });
    user.roleId = uerRole.id;

    try {
      return this.DB.repo.User.create(user);
    } catch (error) {
      if (error.parent.code === UNIQUE_KEY_VIOLATION) {
        throw new ConflictException('User already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async validateUserPassword(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<User> {
    const { username, password } = authCredentialsDto;
    const user = await this.userRepository
      .scope('withPassword')
      .findOne({ where: { username } });

    if (user) {
      const hash = await bcrypt.hash(password, user.salt);
      if (hash === user.password) {
        return user;
      }
    }
    return null;
  }

  async logout(token: string): Promise<void> {
    await this.loginTokenService.expireToken(token);
  }

  async forgotPassword(params: any): Promise<any> {
    const { username } = params;
    const user = await this.userRepository.findOne({ where: { username } });
    if (user) {
      this.forgotPasswordService.generateRequest(user.id);
      return { success: true };
    } else {
      throw new UnauthorizedException('Invalid username');
    }
  }

  async resetPassword(
    authResetPasswordDto: AuthResetPasswordDto,
    token: string,
  ): Promise<any> {
    const { password } = authResetPasswordDto;
    const resetRequest = await this.forgotPasswordService.getRestRequest(token);
    if (resetRequest) {
      const user = await this.userRepository.findOne({
        where: { id: resetRequest.userId },
      });
      if (user) {
        user.salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(password, user.salt);
        // user.passwordResetAt = moment(moment()).add(1, 'month').toDate();
        user.save();

        await this.forgotPasswordService.served(resetRequest.id);

        return { success: true };
      }
    }
    throw new InternalServerErrorException();
  }

  async updatePassword(data: any, loggedInUser: any): Promise<any> {
    const { password, confirmPassword } = data;

    if (password === confirmPassword) {
      const salt = await bcrypt.genSalt();
      const newPassword = await bcrypt.hash(password, salt);

      const update = {
        salt,
        password: newPassword,
        passwordResetAt: moment(moment()).add(1, 'month').toDate(),
      };
      await this.userRepository.update(update, {
        where: { id: loggedInUser.user.id },
      });

      return { success: true };
    }
    throw new BadRequestException('Confirm password does not match');
  }

  async changePassword(data: any, loggedInUser: any): Promise<any> {
    const { currentPassword, newPassword: password, confirmPassword } = data;

    const { username } = loggedInUser;

    const validate: any = {
      username,
      password: currentPassword,
    };
    const response = await this.validateUserPassword(validate);
    if (response) {
      if (password === confirmPassword) {
        const newPassword = await bcrypt.hash(password, response.salt);

        if (response.password !== newPassword) {
          const update = {
            password: newPassword,
            passwordResetAt: moment(moment()).add(1, 'month').toDate(),
          };
          await this.userRepository.update(update, {
            where: { id: loggedInUser.user.id },
          });

          return { success: true };
        }
        throw new BadRequestException(
          'You used an old password. To protect your account, choose a new password.',
        );
      }
      throw new BadRequestException('Confirm password does not match');
    }
    throw new BadRequestException('Invalid current password');
  }

  async throwInvalidCredentialsException() {
    throw new UnauthorizedException('Invalid credentials');
  }

  async getLoggedInUserByToken(tokenBearer: string) {
    const token = tokenBearer.substring(7);

    const tokenDetail = await this.loginTokenRepository.findOne({
      where: { token },
      include: { model: User },
    });
    await this.validate.token(tokenDetail);
    const loggedInUser = await this.userContextService.getUserContext(
      tokenDetail,
    );
    return loggedInUser;
  }

  updateMonthlySubscriptionStatus = async (data: any) => {
    const { status, userId } = data;
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    try {
      await this.DB.repo.MonthlySubscription.update(
        { status },
        {
          where: Sequelize.and(
            { userId },
            Sequelize.literal(`EXTRACT(MONTH FROM "date") = ${currentMonth}`),
            Sequelize.literal(`EXTRACT(YEAR FROM "date") = ${currentYear}`),
          ),
        },
      );

      return { message: 'Subscription complete!' };
    } catch (error) {
      throw new ConflictException(error.message);
    }
  };

  addNewSubscription = async (data: any, clientInfo: any) => {
    const { repo } = this.DB;
    const { userData, paymentData } = data;
    const { paymentMethod: payment_method } = paymentData;
    const savedUser = await this.signUp(userData);
    const userId = savedUser.id;

    // ----- Get or Create Customer
    let customer: any = { id: null };
    const response = await repo.MonthlySubscription.findOne({
      where: { userId },
    });

    customer.id = response?.customerId;
    if (!response) {
      customer = await this.createCustomer(payment_method, savedUser);
    }

    console.log('STRIPE_PRODUCT_ID', STRIPE_PRODUCT_ID);

    const subscriptionData = {
      priceId: STRIPE_PRODUCT_ID,
      customerId: customer.id,
    };
    const subscription = await this.createSubscription(subscriptionData);

    const subData: any = {
      date: dayjs(),
      userId,
      createdAt: dayjs(),
      customerId: customer.id,
      paymentMethodId: payment_method,
      subscriptionId: subscription.subscriptionId,
      subscriptionItemId: subscription.subscriptionItemId,
    };

    if (subscription.status !== 'requires_action') {
      subData.status = SUBSCRIPTION_STATUS.PAID;
    }
    await this.addMonthlySubscription(subData);

    const loggedInUser: any = await this.loginTokenService.generateToken(
      savedUser,
      {
        ...clientInfo,
      },
    );

    return { ...subscription, loggedInUser };
  };

  addMonthlySubscription = async (data: {
    date: Date;
    userId: string;
    customerId: string;
    subscriptionId: string;
    status: string;
    createdAt: string;
  }) => {
    data.createdAt = dayjs();
    await this.DB.repo.MonthlySubscription.create(data);
  };

  createCustomer = (payment_method: string, user: any) => {
    const { username, email } = user;
    const customer = {
      payment_method,
      name: username,
      email,
      invoice_settings: {
        default_payment_method: payment_method,
      },
    };

    return stripe.customers.create(customer);
  };

  createSubscription = async (body: {
    customerId: string;
    priceId: string;
  }) => {
    const { customerId, priceId } = body;

    console.log('body', body);
    const data = {
      customer: customerId,
      items: [{ price: priceId }],
      expand: ['latest_invoice.payment_intent'],
    };

    console.log('data', data);

    const response = await stripe.subscriptions.create(data);

    return {
      clientSecret:
        response['latest_invoice']['payment_intent']['client_secret'],
      status: response['latest_invoice']['payment_intent']['status'],
      subscriptionId: response?.id,
      subscriptionItemId: response?.items?.data?.[0]?.id,
    };
  };
}
