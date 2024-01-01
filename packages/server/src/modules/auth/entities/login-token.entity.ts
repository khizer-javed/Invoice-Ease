import { json } from 'sequelize';
import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from 'src/modules/user/entities/user.entity';

@Table({
  tableName: 'LoginTokens',
  timestamps: true,
  scopes: {
    active: { where: { isActive: true } },
  },
})
export class LoginToken extends Model {
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

  @Column(DataType.DATE)
  expiredAt: Date;

  @Column(DataType.STRING(50))
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
