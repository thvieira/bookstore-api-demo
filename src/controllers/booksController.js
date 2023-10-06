import books from "../models/books.js";

class BooksController {

    static async listAll(req, res) {
        try {
            const booksList = await books.find();
            res.status(200).json(booksList);
        } catch (error) {
            res.status(500).json({ message: `[ Error ] Falha ao listar livros: ${erro.message}` });
        }
    };

    static async searchById(req, res) {
        try {
          const id = req.params.id;
          const book = books.findById(id);
          res.status(200).json(book);
        } catch (erro) {
            res.status(500).json({ message: `[ Error ] Falha ao buscar livro: ${erro.message}` });
        }
    };
    
    static async create(req, res) {
        try {
            const newBook = await books.create(req.body);
            res.status(201).json({ newBook });
        } catch (erro) {
            res.status(500).json({ message: `[ Error ] Falha ao cadastrar novo livro: ${erro.message}` });
        }
    }

    static async updateBook(req, res) {
        try {
             const updatedBook = await books.findByIdAndUpdate(req.params.id, req.body);
            res.status(200).json({ updatedBook });
        } catch (erro) {
            res.status(500).json({ message: `[ Error ] Falha ao editar livro: ${erro.message}` });
        }
    };
    
    static async removeBook(req, res) {
        try {
            await books.findByIdAndDelete(req.params.id);
            res.status(204).json({});
        } catch (erro) {
            res.status(500).json({ message: `[ Error ] Falha ao remover livro: ${erro.message}` });
        }
    };
    
}

export default BooksController;