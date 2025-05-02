import express from "express";
import { login, signup } from "../controllers/auth.controller";

const router = express.Router();

router.post("/signup", async (req, res, next) => {
    try {
        await signup(req, res);
    } catch (error) {
        next(error);
    }
});

router.post("/login", async (req, res, next) => {
    try {
        await login(req, res);
    } catch (error) {
        next(error);
    }
});


export default router;