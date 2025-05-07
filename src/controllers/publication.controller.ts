import { Request, Response } from "express";
import { Publication } from "../models/publication";
import { UserPublication } from "../models/user-publication";
import { PublicationStatus } from "../enums/publication-status";

export const addPublication = async (req: Request, res: Response) => {
    const transaction = await Publication.sequelize?.transaction();
    try {
        const {
            academicYear,
            title,
            affiliated,
            name,
            details,
            impactFactor,
            typeId,
            subTypeId,
            createdUserId,
            branchId,
            facultyIds,
        } = req.body;

        // Create the publication with default status "requested"
        const newPublication = await Publication.create(
            {
                academicYear,
                title,
                affiliated,
                name,
                details,
                impactFactor,
                typeId,
                subTypeId,
                createdUserId,
                branchId
            },
            { transaction }
        );

        // Add entries to UserPublications for each facultyId
        if (facultyIds && Array.isArray(facultyIds)) {
            const userPublications = facultyIds.map((facultyId: number) => ({
                userId: facultyId,
                publicationId: newPublication.id,
            }));
            await UserPublication.bulkCreate(userPublications, { transaction });
        }

        // Commit the transaction
        await transaction?.commit();

        return res.status(201).json({
            message: "Publication added successfully",
            publication: newPublication,
        });
    } catch (error) {
        // Rollback the transaction in case of an error
        await transaction?.rollback();
        console.error("Error adding publication:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};