const config = require('../config.json');
const jwt = require('jsonwebtoken');
const db = require('../_helpers/database');
const Whiteboard = db.Whiteboard;


module.exports = {
    getBoard,
    saveBoard,
    clearBoard
}

async function getBoard(username) {
    let wb = await Whiteboard.findOne({username: username });

    if(!wb) {
        wb = new Whiteboard({username: username, strokes: []});
        await wb.save();
    }

    return wb.strokes;
}

async function clearBoard(username) {
    return Whiteboard.delete({"username": username});
}

async function saveBoard(data) {

    let wb = await Whiteboard.findOne({ username: data.username})

    if(!wb) {
        wb = new Whiteboard({username: data.username, strokes:[]});
    }

    delete data["username"];
    wb.strokes.push(data);
    await wb.save();
}
