const whiteboardService = require('../services/whiteboard.service')


module.exports = {
    getBoard,
    clearBoard,
    saveBoard
};

function getBoard(req, res, next) {
    console.log(req.query.username);
    whiteboardService.getBoard(req.query.username)
        .then((data) => res.json(data))
        .catch(err => console.log(err));
}

function saveBoard(req, res, next) {
    console.log(req.body);
    whiteboardService.saveBoard(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}


function clearBoard(req, res, next) {
    console.log(req.query.username);
    whiteboardService.clearBoard(req.query.username)
        .then((data) => res.json(data))
        .catch(err => console.log(err));
}
