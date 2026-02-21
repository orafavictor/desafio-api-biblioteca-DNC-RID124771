const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookControllers');

router.get('/livros', bookController.getAllBooks);

router.post('/livros', bookController.createBook);

module.exports = router;