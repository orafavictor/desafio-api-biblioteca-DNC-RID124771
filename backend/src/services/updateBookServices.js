const bookRepository = require('../repositories/bookRepositories');

const execute = (id, bookData) => {
  const bookId = parseInt(id);
  const bookExists = bookRepository.findById(bookId);
  
  if (!bookExists) {
    throw new Error("Livro não encontrado."); 
  }
  
  const updatedBook = bookRepository.update(bookId, bookData);
  return updatedBook;
};

module.exports = { execute };