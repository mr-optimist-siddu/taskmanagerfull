const express = require("express");
const router = express.Router()

const ListController = require('../controller/list')

router.get('/', ListController.get);
router.post('/', ListController.post);
router.patch('/:id', ListController.patch);
router.delete('/:id', ListController.delete);

module.exports = router;