import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

export class Branch extends Model {
    id!: number;
    name!: string;
}

Branch.init(
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
        tableName: "branch",
        timestamps: false,
    }
);