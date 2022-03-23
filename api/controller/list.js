const winston = require('winston');
const { logger } = require('../logger');
const { List, Task } = require('../db/models');

class ListController{
    get(req, res) {
        List.find({
        _userId: req.user_id
        }).then((lists) => {
            res.send(lists);
            logger.info('Fetching the lists of from DB');
        }).catch((err) => {
            res.send(err);
        });
    }

    post(req, res) {
        try {
            if (req.body.title === "") {
                logger.error('Required list name ');
                throw new Error('Bad Request');
            } else {
                let title = req.body.title;
                let newList = new List({
                    title,
                    _userId: req.user_id
                });
                newList.save().then((listDoc) => {
                    logger.info('New List ' + title + ' Created Successfully');
                    res.send(listDoc);
                })
            }
        } catch (err) {
            if (err.message === 'Bad Request') {
                res.status(400).json(err.message)
            }
            res.status(500).json(err.message)
        }
    }

    patch(req, res) {
        try {
            if (req.params.id === "" && req.user_id === "") {
                logger.error('Bad Request');
                throw new Error('Bad Request');
            } else {
                if (req.body === " ") {
                    logger.error('Title is required');
                    throw new Error('Bad Request');
                } else {
                    List.findOneAndUpdate({ _id: req.params.id, _userId: req.user_id }, {
                    $set: req.body
                }).then(() => {
                    logger.info('List name updated Successfully');
                    res.send({ 'message': 'updated successfully' });
                });
                }
                
            }
        } catch (err) {
            if (err.message === 'Bad Request') {
                logger.error('Bad Request');
                res.status(400).json(err.message)
            }
            res.status(500).json(err.message)
        }
    }

    delete(req, res) {
        List.findOneAndRemove({
        _id: req.params.id,
        _userId: req.user_id
        }).then((removedListDoc) => {
        res.send(removedListDoc);
        deleteTasksFromList(removedListDoc._id);
        })
    }
}
/* HELPER METHODS */
let deleteTasksFromList = (_listId) => {
    Task.deleteMany({
        _listId
    }).then(() => {
        logger.info('Tasks from ' + _listId + ' were deleted!')
    })
}

module.exports = new ListController();
