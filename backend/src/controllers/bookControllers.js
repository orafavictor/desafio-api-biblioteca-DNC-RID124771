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

const getAllBooks = (req, res) => {
  res.status(200).json(books);
};

const createBook = (req, res) => {
  const { titulo, paginas, isbn, editora } = req.body;

  const newId = books.length > 0 ? books[books.length - 1].id + 1 : 1;

  const newBook = {
    id: newId,
    titulo,
    paginas,
    isbn,
    editora
  };

  books.push(newBook);

  res.status(201).json({
    mensagem: "Livro criado com sucesso!",
    livro: newBook
  });
};

module.exports = {
  getAllBooks,
  createBook
};