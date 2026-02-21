const bookRepository = require('../repositories/bookRepositories');
const createBookService = require('../services/createBookServices');
const { createBookSchema } = require('../schemas/bookSchemas');

const getAllBooks = (req, res) => {
  const books = bookRepository.getAll();
  res.status(200).json(books);
};

const createBook = (req, res) => {
  try {
    // 1. Zod valida os dados (Se estiver errado, ele pula direto pro 'catch' lá embaixo)
    const bookData = createBookSchema.parse(req.body);

    // 2. Chama o Service para criar o livro
    const newBook = createBookService.execute(bookData);

    // 3. Devolve a resposta de sucesso
    res.status(201).json({ mensagem: "Livro criado com sucesso!", livro: newBook });

  } catch (error) {
    // Se o Zod barrar algo, devolvemos o erro bonitinho pro usuário
    res.status(400).json({ erros: error.errors });
  }
};

module.exports = { getAllBooks, createBook };