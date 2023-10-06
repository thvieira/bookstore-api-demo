import express from "express";
import auth from "./authRoutes.js";
import books from "./booksRoutes.js";

const routes = (app) => {
  app.route("/").get((req, res) => res.status(200).send("It's work!"));
  app.use(express.json(), auth, books);
};

export default routes;
