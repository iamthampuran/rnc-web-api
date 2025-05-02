import { User } from "../models/user";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { UserRole } from "../enums/user-roles";
import { generateToken } from "../utils/generateToken";

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

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }
        return res.status(200).json({ message: "Login successful", userId: user.id, token: generateToken(user.id, user.email), role: user.roleId });
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}