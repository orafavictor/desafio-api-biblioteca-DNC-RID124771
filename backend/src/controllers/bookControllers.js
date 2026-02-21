const bookRepository = require('../repositories/bookRepositories');
const createBookService = require('../services/createBookServices');
const updateBookService = require('../services/updateBookServices'); 
const deleteBookService = require('../services/deleteBookServices');
const { createBookSchema, updateBookSchema } = require('../schemas/bookSchemas'); 

const getAllBooks = (req, res) => {
  const books = bookRepository.getAll();
  res.status(200).json(books);
};

const createBook = (req, res) => {
  try {
    const bookData = createBookSchema.parse(req.body);
    const newBook = createBookService.execute(bookData);
    res.status(201).json({ mensagem: "Livro criado com sucesso!", livro: newBook });
  } catch (error) {
    const errosZod = error.issues || error.errors;

    if (errosZod) {
      const errosFormatados = errosZod.map(err => {
        const nomeDoCampo = err.path[0] || 'erro';
        return `${nomeDoCampo}: ${err.message}`;
      });
      
      return res.status(400).json({ erros: errosFormatados });
    }
    
    res.status(404).json({ mensagem: error.message });
  }
};

const updateBook = (req, res) => {
  try {
    const { id } = req.params;
    const bookData = updateBookSchema.parse(req.body);
    const updatedBook = updateBookService.execute(id, bookData);

    res.status(200).json({ mensagem: "Livro atualizado com sucesso!", livro: updatedBook });

  } catch (error) {
    const errosZod = error.issues || error.errors;

    if (errosZod) {
      const errosFormatados = errosZod.map(err => {
        const nomeDoCampo = err.path[0] || 'erro';
        return `${nomeDoCampo}: ${err.message}`;
      });
      
      return res.status(400).json({ erros: errosFormatados });
    }
    
    res.status(404).json({ mensagem: error.message });
  }
};

const deleteBook = (req, res) => {
  try {
    const { id } = req.params;
    
    deleteBookService.execute(id);

    res.status(200).json({ mensagem: "Livro deletado com sucesso!" });

  } catch (error) {
    res.status(404).json({ mensagem: error.message });
  }
};

module.exports = { getAllBooks, createBook, updateBook, deleteBook };