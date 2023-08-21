import express from "express";

const router = express.Router();

import {
  getAlllibraries,
  getlibrariesById,
  createlibrary,
  updatelibrary,
  deletelibrary,
} from "../controllers/library.js";

router.get("/", getAlllibraries);

router.get("/:id", getlibrariesById);

router.put("/:id", updatelibrary);

router.post("/", createlibrary);

router.delete("/:id", deletelibrary);

export default router;
