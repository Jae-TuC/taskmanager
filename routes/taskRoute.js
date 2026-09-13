const express = require('express')
const taskRoute = express.Router()

const { createTask, getTasks, getTask, updateTask, deleteTask } = require("./../controllers/taskController");
const protect = require('../middleware/auth');

taskRoute.post('/task', protect, createTask)
taskRoute.get('/task', protect, getTasks)
taskRoute.get('/task/:taskId', protect, getTask)
taskRoute.patch('/task/:taskId', protect, updateTask)
taskRoute.delete('/task/:taskId', protect, deleteTask)

module.exports = taskRoute