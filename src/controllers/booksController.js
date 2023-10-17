import Books from "../models/books.js";

class BooksController {

    static async listAll(req, res) {
        try {
            const booksList = await Books.find();
            res.status(200).json(booksList);
        } catch (error) {
            res.status(500).json({ message: `[ Error ] Falha ao listar livros: ${error.message}` });
        }
    };

    static async searchById(req, res) {
        try {
          const id = req.params.id;
          const book = await Books.findById(id);
          if(!book.length) res.status(404).json({ message: `Book not found for ${id} ID.` });
          else res.status(200).json(book);
        } catch (error) {
            res.status(500).json({ message: `[ Error ] Falha ao buscar livro: ${error.message}` });
        }
    };
    
    static async create(req, res) {
        try {
            const newBook = await Books.insert(req.body);
            res.status(201).json({ newBook });
        } catch (error) {
            res.status(500).json({ message: `[ Error ] Falha ao cadastrar novo livro: ${error.message}` });
        }
    }

    static async updateBook(req, res) {
        try {
            const book = await Books.findById(req.params.id);
            if( book.length === 0 ) {
                res.status(404).json({ message: "Book not found." });
            } else {
                const updatedBook = await Books.findByIdAndUpdate(req.params.id, req.body);
                res.status(200).json({ updatedBook });
            }
        } catch (error) {
            res.status(500).json({ message: `[ Error ] Falha ao editar livro: ${error.message}` });
        }
    };
    
    static async removeBook(req, res) {
        try {
            await Books.findByIdAndDelete(req.params.id);
            res.status(204).json({});
        } catch (error) {
            res.status(500).json({ message: `[ Error ] Falha ao remover livro: ${error.message}` });
        }
    };
    
}

export default BooksController;