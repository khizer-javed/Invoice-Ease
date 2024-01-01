import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  DataType,
  ForeignKey,
  HasMany,
  BelongsTo,
} from 'sequelize-typescript';
import { Role } from './role.entity';
import { Permission } from './permission.entity';
import { User } from 'src/modules/user/entities/user.entity';

@Table({
  tableName: 'RolePermissions',
  timestamps: true,
  paranoid: true,
  scopes: {
    active: { where: { isActive: true } },
  },
})
export class RolePermission extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @ForeignKey(() => Role)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    field: 'fkRoleId',
  })
  roleId: number;

  @ForeignKey(() => Role)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    field: 'fkPermissionId',
  })
  permissionId: number;

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

  @BelongsTo(() => Role, { foreignKey: 'roleId' })
  Role: Role;

  @BelongsTo(() => Permission, { foreignKey: 'permissionId' })
  Permission: Permission;
}
