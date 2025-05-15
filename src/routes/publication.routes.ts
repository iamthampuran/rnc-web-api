import express from "express";
import { addPublication, getPublicationsOfUsersByStatus, updatePublicatoinStatus } from "../controllers/publication.controller";

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

router.get("/getAll/:status", async (req, res, next) => {
    try {

        await getPublicationsOfUsersByStatus(req, res);
    }
    catch (error) {
        next(error);
    }
});

router.put("/update/:id", async (req, res, next) => {
    try {
        // Call the controller function to update the publication
        await updatePublicatoinStatus(req, res);
    } catch (error) {
        next(error);
    }
});

export default router;