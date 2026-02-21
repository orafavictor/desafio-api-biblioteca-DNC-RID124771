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

const updateBook = (req, res) => {
  const { id } = req.params;
  const { titulo, paginas, isbn, editora } = req.body;

  const bookIndex = books.findIndex(book => book.id === parseInt(id));

  if (bookIndex === -1) {
    return res.status(404).json({ mensagem: "Livro não encontrado." });
  }

  books[bookIndex] = {
    id: parseInt(id),
    titulo,
    paginas,
    isbn,
    editora
  };

  res.status(200).json({
    mensagem: "Livro atualizado com sucesso!",
    livro: books[bookIndex]
  });
};

const deleteBook = (req, res) => {
  const { id } = req.params;

  const bookIndex = books.findIndex(book => book.id === parseInt(id));

  if (bookIndex === -1) {
    return res.status(404).json({ mensagem: "Livro não encontrado." });
  }

  books.splice(bookIndex, 1);

  res.status(200).json({ mensagem: "Livro deletado com sucesso!" });
};

module.exports = {
  getAllBooks,
  createBook,
  updateBook,
  deleteBook
};