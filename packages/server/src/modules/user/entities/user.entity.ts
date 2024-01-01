import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  Unique,
  Default,
  AllowNull,
  DataType,
  HasOne,
  HasMany,
  DefaultScope,
  Scopes,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { LoginToken } from 'src/modules/auth/entities/login-token.entity';
// import { Company } from 'src/modules/company/entities/company.entity';
import { Role } from 'src/modules/role/entities/role.entity';
import { SuperUser } from './super-user.entity';

@DefaultScope(() => ({
  attributes: { exclude: ['password', 'salt'] },
}))
@Scopes(() => ({
  withPassword: {},
}))
@Table({
  tableName: 'Users',
  timestamps: true,
  paranoid: true,
  scopes: {
    active: { where: { isActive: true } },
  },
})

export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;
  
  @ForeignKey(() => Role)
  @Column({
    type: DataType.INTEGER,
    field: 'fkRoleId',
  })
  roleId: number;

  @Unique(true)
  @Column(DataType.STRING(20))
  username: string;

  @Column(DataType.STRING(100))
  password: string;

  @Column(DataType.STRING(50))
  email: string;

  @Column(DataType.STRING(20))
  phone: string;

  @Column(DataType.TEXT)
  profilePic: string;

  @Default(true)
  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  isActive: boolean;

  @Column(DataType.STRING)
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
    type: DataType.INTEGER,
    field: 'fkCreatedBy',
  })
  createdBy: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    field: 'fkUpdatedBy',
  })
  updatedBy: number;

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
