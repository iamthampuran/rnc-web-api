import { DataTypes, Model } from "sequelize";
import { PublicationStatus } from "../enums/publication-status";
import sequelize from "../config/database";

export class Publication extends Model {
    public id!: number;
    public academicYear!: string;
    public title!: string;
    public affiliated!: boolean;
    public name!: string;
    public details!: string;
    public impactFactor!: string;
    public typeId!: number;
    public subTypeId!: number;
    public status: number = PublicationStatus.requested; // PublicationStatus
    public createdUserId!: number;
    public branchId!: number;
    public createdAt!: Date;
    public updatedAt!: Date;
}

Publication.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        academicYear: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        affiliated: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        details: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        impactFactor: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        typeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        subTypeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        statusId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: PublicationStatus.requested,
        },
        createdUserId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        branchId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        tableName: "publications",
        timestamps: true
    }
)