const bookRepository = require('../repositories/bookRepositories');

const execute = (id) => {
  const bookId = parseInt(id);
  const book = bookRepository.findById(bookId);
  
  if (!book) {
    throw new Error("Livro não encontrado.");
  }

  return book;
};

module.exports = { execute };