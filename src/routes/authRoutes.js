import express from "express";
import AuthController from "../controllers/authController.js";

const routes = express.Router();

routes.post("/auth", AuthController.authenticate);
routes.post("/register", AuthController.register);

export default routes;
