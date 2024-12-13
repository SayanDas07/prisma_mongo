import { create, deleteMovie, fetch, search, update } from "../controllers/movie.controller.js";
import { Router } from 'express';

const router = Router();

router.get("/" ,fetch)
router.post("/mv" ,create)
router.put("/update/:id" ,update)
router.delete("/delete/:id" ,deleteMovie)
router.get("/search" ,search)

export default router;