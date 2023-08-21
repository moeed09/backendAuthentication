
import dotenv from "dotenv";
dotenv.config();
import express from "express";


import libraryRouter from "./routes/library.js";
import authorRouter from "./routes/author.js";
import bookRouter from "./routes/book.js";




const app = express();
app.use(express.json());

app.use("/author", authorRouter);
app.use("/book", bookRouter);
app.use("/library", libraryRouter);




const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
