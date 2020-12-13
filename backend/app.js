const http = require('http');
const express = require('express');
const app = express();
//const compression = require('compression');


/*CORS stands for Cross Origin Resource Sharing and allows modern web browsers to be able to send AJAX requests and receive HTTP responses for resource from other domains other that the domain serving the client side application.*/
const cors = require('cors');

//Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
const bodyParser = require('body-parser');

// Our JWT logic. Uses express-jwt which is a middleware that validates JsonWebTokens and sets req.user.
const jwt = require('./_helpers/jwt');


// Our error handler
const errorHandler = require('./_helpers/error-handler');

// whiteboard service
const whiteboardService = require('./services/whiteboard.service');


// serving static files
const path = require('path');
const allowedExt = ['.js','.ico','.css','.png','.jpg','.woff2','.woff','.ttf','.svg','.ts', '.html'];
app.use('/', express.static(path.join(__dirname, '../frontend/dist/frontend')));



app.use(['/feed', '/myboard', '/register', '/login', '/home'], (req, res) => {
  if (allowedExt.filter(ext => req.url.indexOf(ext) > 0).length > 0) {
    console.log(req.body);
    res.sendFile(path.join(__dirname, `../frontend/dist/frontend${req.url}`));
  }
  else{
    console.log(req.body);
    res.sendFile(path.join(__dirname, '../frontend/dist/frontend/index.html'));
  }
});

// app.use('/myboard', (req, res) => {
//   if (allowedExt.filter(ext => req.url.indexOf(ext) > 0).length > 0) {
//     console.log(req.body);
//     res.sendFile(path.join(__dirname, `../frontend/dist/frontend${req.url}`));
//   }
//   else{
//     console.log(req.body);
//     res.sendFile(path.join(__dirname, '../frontend/dist/frontend/index.html'));
//   }
// });
//
// app.use('/login', (req, res) => {
//   if (allowedExt.filter(ext => req.url.indexOf(ext) > 0).length > 0) {
//     console.log(req.body);
//     res.sendFile(path.join(__dirname, `../frontend/dist/frontend${req.url}`));
//   }
//   else{
//     console.log(req.body);
//     res.sendFile(path.join(__dirname, '../frontend/dist/frontend/index.html'));
//   }
// });




//socket.io
const server = http.createServer(app);
const io = require('socket.io')(server, {origins: '*:*'});


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
//app.use(jwt());


app.use('/user', require('./routes/user.router'));
app.use('/whiteboard', require('./routes/whiteboard.router'));
app.use('/', express.static(path.join(__dirname, '../frontend/dist/frontend')));

//app.use(errorHandler);


//SOCKET.IO
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('mouse_output', (data) => {
    //console.log('Drawing Data Received: ' + data);
    //io.to(room).emit('mouse_input', data);
    socket.compress(true).broadcast.emit('mouse_input', data);
    whiteboardService.saveBoard(data).then();
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


//compression
// function shouldCompress (req, res) {
//   if (req.headers['x-no-compression']) {
//     // don't compress responses with this request header
//     return false
//   }
//
//   // fallback to standard filter function
//   return compression.filter(req, res)
// }
