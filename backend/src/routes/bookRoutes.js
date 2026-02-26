const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookControllers');

router.get('/livros', bookController.getAllBooks);

router.get('/livros/:id', bookController.getBookById);

router.post('/livros', bookController.createBook);

router.put('/livros/:id', bookController.updateBook);

router.delete('/livros/:id', bookController.deleteBook);

module.exports = router;