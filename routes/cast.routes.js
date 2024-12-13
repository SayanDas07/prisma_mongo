import {deleteCast, fetchCast, storeCast, updateCast } from "../controllers/cast.controller.js";
import { Router } from 'express';

const router = Router();

router.get("/fetch" ,fetchCast)
router.post("/store" ,storeCast)
router.put("/update/:id" ,updateCast)
router.delete("/delete/:id" ,deleteCast)


export default router;