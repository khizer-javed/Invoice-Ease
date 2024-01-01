import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from 'src/modules/user/entities/user.entity';

@Table({
  tableName: 'ForgotPasswords',
  timestamps: true,
  scopes: {
    active: { where: { isActive: true } },
  },
})
export class ForgotPassword extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    field: 'fkUserId',
  })
  userId: number;

  @AllowNull(false)
  @Column(DataType.TEXT)
  token: string;

  @AllowNull(false)
  @Column(DataType.DATE)
  expiredAt: Date;

  @Column(DataType.DATE)
  servedAt: Date;

  @AllowNull(false)
  @Column(DataType.DATE)
  createdAt: Date;

  @Column(DataType.DATE)
  updatedAt: Date;
}
