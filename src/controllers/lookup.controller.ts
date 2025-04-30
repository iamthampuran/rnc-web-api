import { Branch } from "../models/branch";
import { Request, Response } from "express";

export const getBranches = async (req : Request, res: Response) => {
    try{
        const branches = await Branch.findAll();
        return res.status(200).json({ branches });
    }
    catch (error) {
        console.error("Error fetching branches:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}