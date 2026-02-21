let books = [
  {
    id: 1,
    titulo: "Gente Ansiosa",
    paginas: 368,
    isbn: "978-6555321111",
    editora: "Rocco"
  },
  {
    id: 2,
    titulo: "Flores para Algernon",
    paginas: 288,
    isbn: "978-8576573937",
    editora: "Editora Aleph"
  }
];

const getAll = () => books;

const create = (newBook) => {
  books.push(newBook);
  return newBook;
};

const findById = (id) => {
  return books.find(book => book.id === id);
};

const update = (id, updatedData) => {
  const bookIndex = books.findIndex(book => book.id === id);
  if (bookIndex === -1) return null;

  books[bookIndex] = {
    ...books[bookIndex],
    ...updatedData
  };
  return books[bookIndex];
};

module.exports = {
  getAll,
  create,
  findById,
  update,
  books
};