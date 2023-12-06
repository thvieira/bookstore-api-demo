import express from "express";
import BooksController from "../controllers/booksController.js";
import jwt from "jsonwebtoken";

const routes = express.Router();

routes.get("/books", BooksController.listAll);
routes.get("/books/:id", BooksController.searchById);
routes.use("*", verifyJWT);
routes.post("/books", BooksController.create);
routes.patch("/books/:id", BooksController.updateBook);
routes.delete("/books/:id", BooksController.removeBook);

function verifyJWT(req, res, next){
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      req.userId = decoded.id;
      next();
    });
  }

export default routes;
