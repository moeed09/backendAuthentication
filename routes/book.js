import express from "express";

const router = express.Router();

import {
  getBookById,
  createBook,
  getAllBooks,
  updateBook,
  deleteBook,
} from "../controllers/book.js";

router.get("/", getAllBooks);

router.get("/:id", getBookById);

router.put("/:id", updateBook);

router.post("/", createBook);

router.delete("/:id", deleteBook);

export default router;
