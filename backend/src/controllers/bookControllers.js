const bookRepository = require('../repositories/bookRepositories');
const createBookService = require('../services/createBookServices');
const updateBookService = require('../services/updateBookServices');
const deleteBookService = require('../services/deleteBookServices');
const { createBookSchema, updateBookSchema } = require('../schemas/bookSchemas');

const getAllBooks = (req, res) => {
  const books = bookRepository.getAll();
  res.status(200).json(books);
};

const createBook = (req, res, next) => {
  try {
    const bookData = createBookSchema.parse(req.body);
    const newBook = createBookService.execute(bookData);
    res.status(201).json({ mensagem: "Livro criado com sucesso!", livro: newBook });
  } catch (error) {
    next(error); 
  }
};

const updateBook = (req, res, next) => {
  try {
    const { id } = req.params;
    const bookData = updateBookSchema.parse(req.body);
    const updatedBook = updateBookService.execute(id, bookData);
    res.status(200).json({ mensagem: "Livro atualizado com sucesso!", livro: updatedBook });
  } catch (error) {
    next(error); 
  }
};

const deleteBook = (req, res, next) => {
  try {
    const { id } = req.params;
    deleteBookService.execute(id);
    res.status(200).json({ mensagem: "Livro deletado com sucesso!" });
  } catch (error) {
    next(error); 
  }
};

module.exports = { getAllBooks, createBook, updateBook, deleteBook };