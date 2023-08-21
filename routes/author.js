import express from "express";

const router = express.Router();

import {
  getAuthorById,
  getAllAuthors,
  createAuthor,
  updateAuthor,
  deleteAuthor,
} from "../controllers/author.js";

router.get("/", getAllAuthors);

router.get("/:id", getAuthorById);

router.put("/:id", updateAuthor);

router.post("/", createAuthor);

router.delete("/:id", deleteAuthor);

export default router;
