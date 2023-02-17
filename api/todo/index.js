const express = require('express');
const TodoController = require('./todo.controller');
const router = express.Router();

router.get('/', TodoController.find);
router.get('/:id', TodoController.detail);
router.post('/', TodoController.create);
router.put('/:id', TodoController.update);
router.delete('/:id', TodoController.delete);

module.exports = router;
