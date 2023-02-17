const express = require('express');
const todo = require('./todo');
const router = express.Router();

router.use('/todos', todo);

module.exports = router;
