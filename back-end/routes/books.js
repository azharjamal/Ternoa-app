const express = require('express');

const booksController = require('../controllers/books');

const storage = require('../helpers/storage');

const router = express.Router();

router.get('/', booksController.getBooks);

router.post('/', storage, booksController.postBook);

router.put('/:id',  storage, booksController.UpdateBook);

router.delete('/:id', booksController.DeleteBook);

module.exports = router;
