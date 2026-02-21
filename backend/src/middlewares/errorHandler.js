const errorHandler = (err, req, res, next) => {
  const errosZod = err.issues || err.errors;
  
  if (errosZod) {
    const errosFormatados = errosZod.map(e => {
      const nomeDoCampo = e.path[0] || 'erro';
      return `${nomeDoCampo}: ${e.message}`;
    });
    return res.status(400).json({ erros: errosFormatados });
  }

  if (err.message === "Livro não encontrado.") {
    return res.status(404).json({ mensagem: err.message });
  }

  console.error("Erro interno:", err);
  return res.status(500).json({ mensagem: "Erro interno do servidor." });
};

module.exports = errorHandler;