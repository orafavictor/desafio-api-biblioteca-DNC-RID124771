const bookRepository = require('../repositories/bookRepositories');

const execute = (bookData) => {
  const books = bookRepository.books;
  const newId = books.length > 0 ? books[books.length - 1].id + 1 : 1;

  const newBook = {
    id: newId,
    ...bookData 
  };

  return bookRepository.create(newBook);
};

module.exports = {
  execute
};