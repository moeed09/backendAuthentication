import { Author } from "../models/Authormodel.js";
import { Op } from "sequelize";

export const getAllAuthors = async (req, res) => {
  try {
    const authors = await Author.findAll();
    res.status(200).json(authors);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getAuthorById = async (req, res) => {
  try {
    const author = await Author.findByPk(req.params.id);
    if (!author) {
      return res.status(404).json({ message: "Author doesnot exist" });
    }
    res.status(200).json(author);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const createAuthor = async (req, res) => {
  try {
    const author = await Author.create(req.body);

    res.status(200).json(author);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
export const updateAuthor = async (req, res) => {
  try {
    const author = await Author.update(req.body, {
      where: { id: req.params.id },
    });
    console.log(author);
    if (author[0] === 1) {
      return res.status(404).json({ message: "Author update successfully" });
    } else {
      return res.status(404).json({ Message: "Author ID does not exist" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const deleteAuthor = async (req, res) => {
  try {
    const idsArray = req.params.id.split(",").map((id) => Number(id));

    const author = await Author.destroy({
      where: { id: { [Op.in]: idsArray } },
    });
    if (author.valueOf() === 0) {
      res.status(200).json({ message: "No record to delete " });
    } else {
      res.status(200).json({ message: "record deleted successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
