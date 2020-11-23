const http = require('http');
const express = require('express');
const app = express();

/*CORS stands for Cross Origin Resource Sharing and allows modern web browsers to be able to send AJAX requests and receive HTTP responses for resource from other domains other that the domain serving the client side application.*/
const cors = require('cors');

//Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
const bodyParser = require('body-parser');

// Our JWT logic. Uses express-jwt which is a middleware that validates JsonWebTokens and sets req.user.
const jwt = require('./_helpers/jwt');


// Our error handler
const errorHandler = require('./_helpers/error-handler');


//socket.io
const server = http.createServer(app);
const io = require('socket.io')(server, {origins: '*:*'});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(jwt());

app.use('/user', require('./routes/user.router'));
// app.use('/course', require('./routes/course.router'));
// app.use('/attendance', require('./routes/attendance.router'));
//app.use(errorHandler);


//SOCKET.IO
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('room', (room) => {
    console.log('joined room: ' + room);
    socket.join(room);
    io.emit('joinedRoom', `socket joined: ${room}`);
  });

  socket.on('mouse_output', (data) => {
    //console.log('Drawing Data Received: ' + data);
    //io.to(room).emit('mouse_input', data);
    io.emit('mouse_input', data);
  });

});



// start server
//const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
app.listen(4000, function () {
  console.log('Server listening on port ' + 4000);
});

server.listen(5000, () => {
  console.log('listening on *:5000');
});
