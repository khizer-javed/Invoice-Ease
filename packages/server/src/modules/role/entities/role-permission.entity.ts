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
import { Permission } from './permission.entity';
import { Role } from './role.entity';

@Table({
  tableName: 'role_permissions',
  timestamps: true,
  paranoid: true,
  scopes: {
    active: { where: { isActive: true } },
  },
})
export class RolePermission extends Model {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ForeignKey(() => Role)
  @AllowNull(false)
  @Column({
    type: DataType.UUID,
    field: 'fkRoleId',
  })
  roleId: string;

  @ForeignKey(() => Role)
  @AllowNull(false)
  @Column({
    type: DataType.UUID,
    field: 'fkPermissionId',
  })
  permissionId: string;

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

  @BelongsTo(() => Role, { foreignKey: 'roleId' })
  Role: Role;

  @BelongsTo(() => Permission, { foreignKey: 'permissionId' })
  Permission: Permission;
}
