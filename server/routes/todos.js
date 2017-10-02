var express = require('express');
var router = express.Router();
const todoController = require('../controllers/todoController');
var authHelper = require('../helpers/authHelper')

/* GET users listing. */
router.get('/:userId', authHelper.isLogin, authHelper.isUserAuthTodo, todoController.getAllToDos);

router.post('/', authHelper.isLogin, todoController.addToDos)

router.put('/check/:todosId', authHelper.isLogin, authHelper.isAuthtoEditDelete, todoController.checkTodos)

router.delete('/:todosId', authHelper.isLogin, authHelper.isAuthtoEditDelete, todoController.deleteTodos)

router.put('/:todosId', authHelper.isLogin, authHelper.isAuthtoEditDelete, todoController.updateTodos)

module.exports = router;
