import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

export class SubType extends Model {
    id!: number;
    name!: string;
}

SubType.init(
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
        tableName: "subtype",
        timestamps: false,
    }
);