import {
  Table,
  Column,
  Model,
  AllowNull,
  DataType,
  ForeignKey,
  BelongsTo,
  Default,
} from 'sequelize-typescript';
import { PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/modules/user/entities/user.entity';

@Table({
  tableName: 'monthly_subscriptions',
  timestamps: true,
  paranoid: true,
})
export class MonthlySubscription extends Model {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column({
    type: DataType.UUID,
    field: 'fkUserId',
  })
  userId: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  customerId: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  subscriptionId: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  subscriptionItemId: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  paymentMethodId: string;

  @Default('Pending')
  @Column(DataType.TEXT)
  status: string;

  @AllowNull(false)
  @Column(DataType.DATE)
  date: Date;

  @AllowNull(false)
  @Column(DataType.DATE)
  createdAt: Date;

  @Column(DataType.DATE)
  updatedAt: Date;

  @Column(DataType.DATE)
  deletedAt: Date;

  //-- ASSOCIATIONS

  @BelongsTo(() => User, { foreignKey: 'userId' })
  User: User;
}
