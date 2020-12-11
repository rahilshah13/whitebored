var express = require('express');
var router = express.Router();
const whiteboardController = require('../controllers/whiteboard.controller');
const Role = require('../_helpers/role');
const authorize = require('../_helpers/authorize');


// router.post('/saveboard', whiteboardController.saveBoard);
router.get('/getboard', whiteboardController.getBoard);
router.get('/clearboard', whiteboardController.clearBoard);

module.exports = router;

