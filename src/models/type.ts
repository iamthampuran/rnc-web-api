import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

export class Type extends Model {
    id!: number;
    name!: string;
}

Type.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: DataTypes.STRING,
    },
    {
        sequelize,
        tableName: "type",
        timestamps: false,
    }
);