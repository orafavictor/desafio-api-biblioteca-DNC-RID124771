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

const getAll = () => {
  return books;
};

const create = (newBook) => {
  books.push(newBook);
  return newBook;
};

module.exports = {
  getAll,
  create,
  books 
};