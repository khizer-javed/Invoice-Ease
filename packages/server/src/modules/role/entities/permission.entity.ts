import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  Default,
  AllowNull,
  DataType,
  HasMany,
} from 'sequelize-typescript';
import { RolePermission } from './role-permission.entity';

@Table({
  tableName: 'Permissions',
  timestamps: true,
  paranoid: true,
  scopes: {
    active: { where: { isActive: true } },
  },
})
export class Permission extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  name: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  permission: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  moduleName: string;

  @Column(DataType.STRING)
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
