import express from "express";
import { addPublication, getPublicationsOfUsersByStatus } from "../controllers/publication.controller";

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

// Route for getting all publications of specific status of specific user
router.get("/getAll/:userId/:status", async (req, res, next) => {
    try {
        await getPublicationsOfUsersByStatus(req, res);
    }
    catch (error) {
        next(error);
    }
});

export default router;