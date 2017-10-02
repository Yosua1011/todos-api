const mongoose = require('mongoose')
const Todo = require('../models/Todo')
const jwt = require('jsonwebtoken')

const verify = token => jwt.verify(token, process.env.JWT_SECRET)

module.exports = {
    getAllToDos: (req, res) => {
        console.log(req.headers.token)
        let user = verify(req.headers.token)
        Todo.find({userId: user._id})
        .then(result => res.send(result))
        .catch(err => res.send(err))
    },

    addToDos: (req, res) => {
        let user = verify(req.headers.token)
        console.log(user)
        Todo.create({
            action: req.body.action,
            title: req.body.title,
            date: req.body.date,
            description: req.body.description,
            check: false,
            userId: user._id
        })
        .then(result => res.send(result))
        .catch(err => res.send(err))
    },

    checkTodos: (req, res) => {
        Todo.update({_id: req.params.todosId}, {
            check: req.body.check
        })
        .then(res.send(`Todos updated`))
        .catch(err => res.send(err))
    },

    updateTodos: (req, res) => {
        Todo.update({_id: req.params.todosId}, {
            action: req.body.action,
            title: req.body.title,
            date: req.body.date,
            description: req.body.description
        })
        .then(res.send(`Todos updated`))
        .catch(err => res.send(err))
    },

    deleteTodos: (req, res) => {
        Todo.deleteOne({_id: req.params.todosId})
        .then(res.send(`Todos deleted`))
        .catch(err => res.send(err))
    }
}