import express from "express";
import { signup } from "../controllers/auth.controller";

const router = express.Router();

router.post("/signup", async (req, res, next) => {
    try {
        await signup(req, res);
    } catch (error) {
        next(error);
    }
});

export default router;