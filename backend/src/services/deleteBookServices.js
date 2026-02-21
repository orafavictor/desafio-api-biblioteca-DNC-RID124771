const bookRepository = require('../repositories/bookRepositories');

const execute = (id) => {
  const bookId = parseInt(id);
  const bookExists = bookRepository.findById(bookId);
  
  if (!bookExists) {
    throw new Error("Livro não encontrado.");
  }

  bookRepository.remove(bookId);
};

module.exports = { execute };