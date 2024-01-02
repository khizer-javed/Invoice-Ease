import {
  AllowNull,
  Column,
  DataType,
  Default,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { PrimaryGeneratedColumn } from 'typeorm';
import { RolePermission } from './role-permission.entity';

@Table({
  tableName: 'permissions',
  timestamps: true,
  paranoid: true,
  scopes: {
    active: { where: { isActive: true } },
  },
})
export class Permission extends Model {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  name: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  permission: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  moduleName: string;

  @Column(DataType.TEXT)
  parent: string;

  @Default(true)
  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  isActive: boolean;

  @AllowNull(false)
  @Column(DataType.DATE)
  createdAt: Date;

  @Column(DataType.DATE)
  updatedAt: Date;

  @Column(DataType.DATE)
  deletedAt: Date;

  //-- ASSOCIATIONS

  @HasMany(() => RolePermission, { foreignKey: 'permissionId' })
  RolePermission: RolePermission;
}
