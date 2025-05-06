import express from "express";
import { getBranches, getLookups } from "../controllers/lookup.controller";

const router = express.Router();

router.get("/branches", async (req, res, next) => {
    try{
        await getBranches(req, res);
    } catch (error) {
        next(error);
    }
});

router.get("/all", async (req, res, next) => {
    try{
        await getLookups(req, res);
    }  catch (error) {
        next(error); 
    }
});

export default router;