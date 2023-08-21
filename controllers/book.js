import { Author } from "../models/Authormodel.js";
import { Books } from "../models/bookmodel.js";
import { Library } from "../models/librarymodel.js";
import { Op } from "sequelize";

export const getAllBooks = async (req, res) => {
  try {
    const book = await Books.findAll({
      include: [
        {
          model: Author,
        },
        {
          model: Library,
        },
      ],
    });
    res.status(200).json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

export const getBookById = async (req, res) => {
  try {
    const book = await Books.findByPk(req.params.id, {
      include: [
        {
          model: Author,
        },
        {
          model: Library,
          as: "library",
        },
      ],
    });
    

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

export const createBook = async (req, res) => {
  const { name, author_id, library_id, year } = req.body;

  try {
    // Check if the book already belongs to an author
    const existingBookWithAuthor = await Books.findOne({
      where: { name, author_id: { [Op.not]: null, [Op.ne]: author_id } },
    });
    if (existingBookWithAuthor) {
      return res
        .status(409)
        .json({ message: "Book already belongs to a different author" });
    }

    // Check if the book already exists in the specified library
    if (library_id) {
      const existingBookInLibrary = await Books.findOne({
        where: { name, library_id },
      });
      if (existingBookInLibrary) {
        return res
          .status(409)
          .json({ message: "Book already exists in the specified library" });
      }
    }

    // Check if the provided authorId exists
    const author = await Author.findByPk(req.body.author_id);
    if (!author) {
      return res.status(404).json({ message: "Author does not exist" });
    }

    // Check if the provided library_id exists
    if (library_id) {
      const library = await Library.findByPk(req.body.library_id);
      if (!library) {
        return res.status(404).json({ message: "Library does not exist" });
      }
    }

    // Create the book with the specified author
    const book = await Books.create({
      name,
      author_id: author_id,
      library_id: library_id,
      year: year,
    });

    res.status(201).json({ message: "Book created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating book" });
  }
};

export const updateBook = async (req, res) => {
  try {
    const book = await Books.update(req.body, {
      where: { id: req.params.id },
      include: [
        {
          model: Author,
        },
      ],
    });
    console.log(book);
    if (book[0] === 1) {
      return res.status(404).json({ message: "Book update successfully" });
    } else {
      return res.status(404).json({ Message: "book ID does not exist" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteBook = async (req, res) => {
  try {
    const idsArray = req.params.id.split(",").map((id) => Number(id));
    const book = await Books.destroy({ where: { id: { [Op.in]: idsArray } } });
    res.status(200).json({ message: "record deleted successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
};
