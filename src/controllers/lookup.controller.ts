import { Branch } from "../models/branch";
import { Request, Response } from "express";
import { Type } from "../models/type";
import { SubType } from "../models/subType";
import { User } from "../models/user";

export const getBranches = async (req: Request, res: Response) => {
    try {
        const branches = await Branch.findAll();
        return res.status(200).json({ branches });
    } catch (error) {
        console.error("Error fetching branches:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const getLookups = async (req: Request, res: Response) => {
    try {
        const branches = await Branch.findAll({ attributes: ["id", "name"] });
        // Assuming Type and Subtype models exist and are imported
        const types = await Type.findAll({ attributes: ["id", "name"] });
        const subtypes = await SubType.findAll({ attributes: ["id", "name"] });

        return res.status(200).json({ branches, types, subtypes });
    } catch (error) {
        console.error("Error fetching lookups:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const getUsersByRoleId = async (req: Request, res: Response) => {
    const { roleId } = req.params; // Assuming roleId is passed as a URL parameter

    try {
        const users = await User.findAll({
            where: { roleId },
            attributes: ["id", "name"], // Adjust attributes as needed
        });

        return res.status(200).json({ users });
    } catch (error) {
        console.error("Error fetching users by role ID:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}