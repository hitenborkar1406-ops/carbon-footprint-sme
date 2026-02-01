import express from "express";
import { createFootprint, getFootprints } from "../controllers/footprintController.js";

const router = express.Router();

router.post("/", createFootprint);
router.get("/", getFootprints);

export default router;
