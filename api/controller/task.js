const { logger } = require('../logger');
const { List, Task } = require('../db/models');
class TaskController{
    get(req, res) {
        try {
            Task.find({
                _listId: req.params.listId
            }).then((tasks) => {
                res.send(tasks);
                logger.info('Fetching the tasks of from DB');
            })
        } catch (err) {
            res.status(400).json(err)
        }
    }



    post(req, res) {
        try {
            if (req.params.listId === "" && req.user_id === "") {
                logger.error('Bad Request');
                throw new Error( 'Bad Request' );
            }
            List.findOne({
            _id: req.params.listId,    
            _userId: req.user_id
            }).then((list) => {
            if (list) {
                return true;
            }
            return false;
            }).then((canCreateTask) => {
            if (canCreateTask) {
                let newTask = new Task({
                    title: req.body.title,
                    _listId: req.params.listId
                    });
                    newTask.save().then((newTaskDoc) => {
                        res.send(newTaskDoc);
                        logger.info('Task Created ' + newTaskDoc.title + ' Successfully');
                    })
            } else {
                logger.error('Bad Request');
                throw new Error( 'Bad Request' );
                }
            })
        } catch (err) {
            if (err.message === 'Bad Request') {
                res.status(400).json(err.message)
            }
            res.status(500).json(err.message)
        }
    }

    patch(req, res) {
        try {
            if (req.params.listId === "" && req.user_id === "") {
                logger.error('Bad Request');
                throw new Error( 'Bad Request' );
            }
            List.findOne({
                _id: req.params.listId,
                _userId: req.user_id
            }).then((list) => {
                if (list) {
                    return true;
                }
                return false;
            }).then((canUpdateTasks) => {
                if (canUpdateTasks) {
                    Task.findOneAndUpdate({
                        _id: req.params.taskId,
                        _listId: req.params.listId
                    }, {
                        $set: req.body
                    }
                    ).then(() => {
                        logger.info('Task name updated Successfully');
                        res.send({ 'message': 'Updated successfully.' })
                    })
                } else {
                    throw new Error( 'Bad Request' );
                }
            })
        } catch (err) {
            if (err.message === 'Bad Request') {
                res.status(400).json(err.message)
            }
            res.status(500).json(err.message)
        }   
    }

    delete(req, res) {
        List.findOne({
            _id: req.params.listId,
            _userId: req.user_id
        }).then((list) => {
            if (list) {
                return true;
                }
            return false;
        }).then((canDeleteTasks) => {
            if (canDeleteTasks) {
                Task.findOneAndRemove({
                    _id: req.params.taskId,
                    _listId: req.params.listId
                }).then((removedTaskDoc) => {
                    res.send(removedTaskDoc);
                })
            } else {
                res.sendStatus(404).json(message);
            }
        });
    }
}

module.exports = new TaskController();