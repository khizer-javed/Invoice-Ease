import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  Default,
  DefaultScope,
  ForeignKey,
  HasMany,
  HasOne,
  Model,
  Scopes,
  Table,
  Unique,
} from 'sequelize-typescript';
import { LoginToken } from 'src/modules/auth/entities/login-token.entity';
import { Role } from 'src/modules/role/entities/role.entity';
import { PrimaryGeneratedColumn } from 'typeorm';
import { SuperUser } from './super-user.entity';

@DefaultScope(() => ({
  attributes: { exclude: ['password', 'salt'] },
}))
@Scopes(() => ({
  withPassword: {},
}))
@Table({
  tableName: 'users',
  timestamps: true,
  paranoid: true,
  scopes: {
    active: { where: { isActive: true } },
  },
})
export class User extends Model {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ForeignKey(() => Role)
  @Column({
    type: DataType.UUID,
    field: 'fkRoleId',
  })
  roleId: string;

  @Unique(true)
  @Column(DataType.TEXT)
  username: string;

  @Column(DataType.TEXT)
  password: string;

  @Column(DataType.TEXT)
  email: string;

  @Column(DataType.TEXT)
  phone: string;

  @Column(DataType.TEXT)
  profilePic: string;

  @Default(true)
  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  isActive: boolean;

  @Column(DataType.TEXT)
  salt: string;

  @Column(DataType.DATE)
  passwordResetAt: Date;

  @AllowNull(false)
  @Column(DataType.DATE)
  createdAt: Date;

  @Column(DataType.DATE)
  updatedAt: Date;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    field: 'fkCreatedBy',
  })
  createdBy: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    field: 'fkUpdatedBy',
  })
  updatedBy: string;

  @Column(DataType.DATE)
  deletedAt: Date;

  //-- ASSOCIATIONS

  @HasOne(() => SuperUser, { foreignKey: 'userId', as: 'SuperUser' })
  SuperUser: SuperUser;

  @HasMany(() => LoginToken, { foreignKey: 'userId' })
  LoginToken: LoginToken;

  @BelongsTo(() => Role, { foreignKey: 'roleId' })
  Role: Role;
}
