import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

export class UserPublication extends Model {
    public id!: number;
    public userId!: number;
    public publicationId!: number;
}

UserPublication.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        publicationId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize, // passing the `sequelize` instance is required
        tableName: "UserPublications",
        timestamps: false, // Disable timestamps if not needed
    }
)