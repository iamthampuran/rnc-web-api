import { User } from "../models/user";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { UserRole } from "../enums/user-roles";

export const signup = async (req: Request, res: Response) => {
    try{
        const { name, email, branchId, password, ocrId } = req.body;

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name,
            email,
            branchId,
            passwordHash,
            ocrId: ocrId || null,
            roleId: UserRole.Faculty 
        });
        return res.status(201).json({ message: "User created successfully", user: newUser.id });
    }
    catch (error) {
        console.error("Error during signup:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}