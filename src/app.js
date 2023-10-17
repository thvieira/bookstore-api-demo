import express from "express";
import routes from "./routes/index.js";

const app = express();

// Adicionar os cabeçalhos Access-Control-Allow-Origin
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

routes(app);

export default app;
