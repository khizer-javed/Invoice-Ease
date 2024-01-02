import {
  AllowNull,
  Column,
  DataType,
  Default,
  ForeignKey,
  HasMany,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/modules/user/entities/user.entity';
import { PrimaryGeneratedColumn } from 'typeorm';
import { RolePermission } from './role-permission.entity';

@Table({
  tableName: 'roles',
  timestamps: true,
  paranoid: true,
  scopes: {
    active: { where: { isActive: true } },
  },
})
export class Role extends Model {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  name: string;

  @Column(DataType.TEXT)
  description: string;

  @Default(true)
  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  isActive: boolean;

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

  @HasMany(() => RolePermission, { foreignKey: 'roleId' })
  RolePermission: RolePermission;

  @HasOne(() => User, { foreignKey: 'roleId' })
  User: User;
}
