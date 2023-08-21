import{Library} from "../models/librarymodel.js";
import {Op} from "sequelize";
import{Books} from "../models/bookmodel.js";

 export const getAlllibraries = async (req, res) => {
    try {
        const library = await Library.findAll();
        res.status(200).json(library);
    } catch (error) {
        res.status(500).json(error);
    }
}

 export const getlibrariesById = async (req, res) => {
    try {
        const library = await Library.findByPk(req.params.id);
        res.status(200).json(library);
    } catch (error) {
        res.status(500).json(error);
    }
}

 export const createlibrary = async (req, res) => {
    
    // if(!req.body.book_id){
    //     req.body.book_id = req.body.book_id.split(",").map((id) => Number(id));
    //     res.status(200).json({ message: "book_id is required" });

    // }
    // const book= await Books.findByPk(req.body.book_id);
    // if(!book){
    //     res.status(200).json({ message: "book doesnot exist" });
    // }
    try{
        
        const library = await Library.create(req.body);
        console.log(library);
        // const obj = {
        //     name:book.name,
        //     author_id:book.author_id,
        //     library_id:library.dataValues.Id,
        //     year:book.year
        // }
        // const book = await Books.update(obj, {
        //     where: { id: req.body.book_id },
        //     include,
        //   });
        //   console.log(book);
        res.status(200).json({ message: "record created successfully" });
    } catch (error) {
        res.status(500).json(error);
    }
}


 export const updatelibrary = async (req, res) => {
    try{
        await Library.update(req.body,{
            where: { id: req.params.id },
        });
        res.status(200).json({ message: "library updated successfully" });
    } catch (error) {
        res.status(500).json(error);
    }
 }
 export const deletelibrary = async (req, res) => {
    try{
        const idsArray = req.params.id.split(",").map((id) => Number(id));

       await Library.destroy({
            where: { id: { [Op.in]: idsArray } },
        })
        res.status(200).json({ message: "record deleted successfully" });
       
    }
    catch (error) {
        res.status(500).json(error);
    }
}