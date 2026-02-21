const { z } = require('zod');

const createBookSchema = z.object({
  titulo: z.string({ required_error: "O título é obrigatório" }).min(1, "O título não pode ser vazio"),
  paginas: z.number({ required_error: "O número de páginas é obrigatório" }).positive("O número de páginas deve ser positivo").min(1, "O número de páginas deve ser pelo menos 1"),
  isbn: z.string({ required_error: "O ISBN é obrigatório" }).min(1, "O ISBN não pode ser vazio"),
  editora: z.string({ required_error: "A editora é obrigatória" }).min(1, "A editora não pode ser vazia")
});

const updateBookSchema = createBookSchema.partial();

module.exports = {
  createBookSchema,
  updateBookSchema
};