import { Request, Response } from "express";
import { Publication } from "../models/publication";
import { UserPublication } from "../models/user-publication";
import { PublicationStatus } from "../enums/publication-status";
import sequelize from "../config/database";

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

export const getPublicationsOfUsersByStatus = async (req: Request, res: Response) => {
    const { status, userId } = req.params; // Get the status from query parameters

    let whereClause = `WHERE p.statusId = ${status}`;
    if (userId) {
        whereClause += ` AND p.createdUserId = ${userId}`;
    }
    try {
        const query = `SELECT 
            p.id,
            p.academicYear,
            p.title,
            p.name,
            p.details,
            p.impactFactor,
            p.affiliated,
            t.name AS type,
            st.name AS subtype,
            b.name AS branch,
            cu.name AS createdUser,
            f.faculties
        FROM 
            Publications p
        JOIN 
            [Type] t ON p.typeId = t.id
        JOIN 
            SubType st ON p.subtypeId = st.id
        JOIN 
            Branch b ON p.branchId = b.id
        JOIN 
            Users cu ON p.createdUserId = cu.id
        JOIN (
            SELECT 
                up.publicationId,
                STRING_AGG(u.name, ', ') AS faculties
            FROM 
                UserPublications up
            JOIN 
                Users u ON u.id = up.userId
            GROUP BY 
                up.publicationId
        ) f ON p.id = f.publicationId
        ${whereClause}
        `;
        const publicationDetails = await sequelize.query(query);

        return res.status(200).json(publicationDetails[0]);
    } catch (error) {
        console.error("Error fetching publications:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const updatePublicatoinStatus = async (req: Request, res: Response) => {
    const statusId = req.body.statusId;
    const publicationId = req.params.id;


    // Find the publication by ID
    const publication = await Publication.findByPk(publicationId);

    if (!publication) {
        return res.status(404).json({ message: "Publication not found" });
    }

    // Update the status of the publication
    publication.statusId = statusId;
    await publication.save().then(() => {
        return res.status(200).json({
            message: "Publication status updated successfully",
            publicationId: publication.id,
        });
    }).catch((error) => {
        console.error("Error updating publication status:", error);
        return res.status(500).json({ message: "Internal server error" });

    });

}