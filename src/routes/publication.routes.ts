import express from "express";
import { addPublication } from "../controllers/publication.controller";

const router = express.Router();

// Route for adding a publication
router.post("/add", async (req, res, next) => {
    try {
        await addPublication(req, res);
    }
    catch (error) {
        next(error);
    }
});

export default router;