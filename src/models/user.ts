import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

export class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public branchId!: number;
  public ocrId!: string;
  public passwordHash!: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    branchId: DataTypes.INTEGER,
    ocrId: DataTypes.STRING,
    passwordHash: DataTypes.STRING,
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: false,
  }
);
