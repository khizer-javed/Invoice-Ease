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
import { UNIQUE_KEY_VIOLATION } from 'src/constants';
import { GlobalDbService } from '../global-db/global-db.service';
import { Sequelize } from 'sequelize';
import Stripe from 'stripe';

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

  async signUp(user: any, clientInfo: any) {
    const { password } = user;
    const userWhere: any = {};
    userWhere.username = user.username;
    const existingUser = await this.DB.getOne('User', userWhere);
    if (existingUser) {
      throw new ConflictException('Username already exists.');
    }
    user.salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(password, user.salt);
    try {
      const savedUser = await this.DB.repo.User.create(user);
      const token: any = await this.loginTokenService.generateToken(savedUser, {
        ...clientInfo,
      });
      return token;
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
    const { status, packageName } = data;
    // const { companyId } = loggedInUser.user;
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    try {
      await this.DB.repo.MonthlySubscription.update(
        { status },
        {
          where: Sequelize.and(
            // { companyId },
            Sequelize.literal(`EXTRACT(MONTH FROM "date") = ${currentMonth}`),
            Sequelize.literal(`EXTRACT(YEAR FROM "date") = ${currentYear}`),
          ),
        },
      );

      if (status === 'Paid') {
        const response = await this.DB.repo.Package.findOne({
          where: { name: packageName },
          raw: true,
        });
        await this.DB.repo.Company.update(
          { packageId: response.id },
          // { where: { id: companyId } },
        );
      }

      return { message: 'Subscription complete!' };
    } catch (error) {
      throw new ConflictException(error.message);
    }
  };

  addNewSubscription = async (data: any, loggedInUser: any) => {
    const { repo } = this.DB;
    const { companyId } = loggedInUser.user;
    const { packageName, paymentMethod: payment_method } = data;

    // ----- Checking if same package is selected
    const existingPackage = await repo.Package.findOne({
      where: { name: packageName },
      include: {
        model: repo.Company,
        required: true,
        where: { id: companyId },
      },
    });

    if (existingPackage) {
      throw new ConflictException(
        'Package already in use! Please select a new package.',
      );
    }

    // ----- Get or Create Customer
    let customer: any = { id: null };
    const response = await repo.MonthlySubscription.findOne({
      where: { companyId },
    });

    customer.id = response?.customerId;
    if (!response) {
      customer = await this.createCustomer(payment_method, loggedInUser);
    }

    // ----- Create Subscription
    const myPackage = await repo.Package.findOne({
      where: { name: packageName },
      raw: true,
    });
    const subscriptionData = {
      priceId: myPackage.stripeId,
      customerId: customer.id,
    };
    const subscription = await this.createSubscription(subscriptionData);

    const subData: any = {
      date: dayjs(),
      companyId,
      createdAt: dayjs(),
      customerId: customer.id,
    };

    if (subscription.status !== 'requires_action') {
      subData.status = 'Paid';
    }
    await this.companyService.addMonthlySubscription(subData, myPackage.id);

    return subscription;
  };
  
  createCustomer = (payment_method: string, loggedInUser: any) => {
    const { username, email } = loggedInUser.user;

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

  createSubscription = async (data: {
    customerId: string;
    priceId: string;
  }) => {
    const { customerId, priceId } = data;

    const response = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      expand: ['latest_invoice.payment_intent'],
    });

    return {
      clientSecret:
        response['latest_invoice']['payment_intent']['client_secret'],
      status: response['latest_invoice']['payment_intent']['status'],
    };
  };
}
