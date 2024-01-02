import { json } from 'sequelize';
import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/modules/user/entities/user.entity';
import { PrimaryGeneratedColumn } from 'typeorm';

@Table({
  tableName: 'login_tokens',
  timestamps: true,
  scopes: {
    active: { where: { isActive: true } },
  },
})
export class LoginToken extends Model {
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
  token: string;

  @Column(DataType.DATE)
  expiredAt: Date;

  @Column(DataType.TEXT)
  ip: string;

  @AllowNull(true)
  @Column(DataType.JSONB)
  userAgent: typeof json;

  @AllowNull(false)
  @Column(DataType.DATE)
  createdAt: Date;

  @Column(DataType.DATE)
  updatedAt: Date;

  //-- ASSOCIATIONS

  @BelongsTo(() => User)
  user: User;
}
