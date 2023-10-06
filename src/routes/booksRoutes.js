import express from "express";
import BooksController from "../controllers/booksController.js";

const routes = express.Router();

routes.get("/books", BooksController.listAll);
routes.get("/books/:id", BooksController.searchById);
routes.post("/books", BooksController.create);
routes.patch("/books/:id", BooksController.updateBook);
routes.delete("/books/:id", BooksController.removeBook);

export default routes;
