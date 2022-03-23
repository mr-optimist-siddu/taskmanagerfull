const express = require("express");
const router = express.Router()

const TaskController = require('../controller/task')

router.get('/lists/:listId/tasks',TaskController.get);
router.post('/lists/:listId/tasks', TaskController.post);
router.patch('/lists/:listId/tasks/:taskId',TaskController.patch);
router.delete('/lists/:listId/tasks/:taskId',TaskController.delete);

module.exports = router;