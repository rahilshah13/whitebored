//TODO: don't forget about the database renaming trick from the video. You can simply change the name to start from scratch.
const config = require('../config.json');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || config.connectionString, { useCreateIndex: true, useNewUrlParser: true });


module.exports = {
    User: require('../models/user.model'),
    Whiteboard: require('../models/whiteboard.model')
    // Attendance: require('../models/attendance.model')
};
