const { z } = require('zod');

const createBookSchema = z.object({
  titulo: z.string({ required_error: "O título é obrigatório" })
           .regex(/\S/, { message: "O título não pode conter apenas espaços em branco" }),
  
  paginas: z.number({ required_error: "O número de páginas é obrigatório" })
            .positive({ message: "O número de páginas deve ser maior que zero" }),
  
  isbn: z.string({ required_error: "O ISBN é obrigatório" })
         .regex(/\S/, { message: "O ISBN não pode conter apenas espaços em branco" }),
  
  editora: z.string({ required_error: "A editora é obrigatória" })
            .regex(/\S/, { message: "A editora não pode conter apenas espaços em branco" })
});

const updateBookSchema = createBookSchema.partial();

module.exports = {
  createBookSchema,
  updateBookSchema
};