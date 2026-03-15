
import { apodQuerySchema, neoQuerySchema } from "./nasaSchemas";
import { validate } from "@/middlewares/validate";
import { getApod, getNeoFeed } from "./nasa.controller";
import { Router } from "express";

const router = Router();

router.get("/apod", validate(apodQuerySchema, "query"), getApod);
router.get("/neo", validate(neoQuerySchema, "query"), getNeoFeed);

export default router;