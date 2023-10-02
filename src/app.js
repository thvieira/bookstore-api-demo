import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Low } from 'lowdb'

const app = express();
app.use(express.json());

const users = [];
const livros = [
  {
    id: 1,
    isbn: "978-1-56619-909-4",
    title: "O canto do vento",
    author: "Atahualpa Yupanqui",
    publisher: "Coragem",
    price: "50.00",
    stock: 0
  }
]

function buscaLivro(id) {
  return livros.findIndex(livro => {
    return livro.id === Number(id);
  })
}

app.get("/", (req, res) => {
  res.status(200).send("It's work!");
});

app.get("/books", (req, res) => {
  res.status(200).json(livros);
});

app.get("/books/:id", (req, res) => {
  const index = buscaLivro(req.params.id);
  console.log(index);
  if(index == -1) res.status(404).json({ menssage: `ID ${req.params.id} doesn't exist in database.` });
  res.status(200).json(livros[index]);
})

let ids = 2;
app.post("/books", (req, res) => {
  let novoLivro = req.body;
  novoLivro.id = ids++;
  livros.push(novoLivro);
  res.status(201).json(novoLivro);
});

app.patch("/books/:id", (req, res) => {
  const index = buscaLivro(req.params.id);
  if(index == -1) res.status(404).json({ menssage: `ID ${req.params.id} doesn't exist in database.` });
  if(req.body.titulo != null) livros[index].titulo = req.body.titulo;
  if(req.body.autor != null) livros[index].autor = req.body.autor;
  if(req.body.editora != null) livros[index].editora = req.body.editora;
  res.status(200).json(livros[index]);
});

app.delete("/books/:id", (req, res) => {
  const index = buscaLivro(req.params.id);
  livros.splice(index, 1);
  res.status(204).json({});
});

export default app;
