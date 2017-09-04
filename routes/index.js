var express = require('express');
var router = express.Router();
var socket_io = require('socket.io');

/* route */
router.get('/', function(req, res, next) {
  if (!req.session.username) {
    res.redirect('/login')
  }
  res.render('index', { title: 'Express', user: req.session.username });
  console.log('当前用户名字：' + req.session.username)
});

router.prepareSocketIO = function (server) {
    var io = socket_io.listen(server);
    io.sockets.on('connection', function (socket) {
        socket.on("tiwen",function(msg){
          console.log(msg);
          // 针对某一条
          // socket.emit("huida","我已经吃了吃了");
          // 广播 io为广播
          io.emit("huida", msg);
        });
        socket.on('comein', function (data) {
            socket.broadcast.emit('conminBack',data.user);
        });
        socket.on('comeout', function (data) {
            socket.broadcast.emit('conminBack',data.user);
        });
        socket.on('join', function (user) {
            socket.user = user;
            socket.emit('state', 'SERVER', true);
            socket.broadcast.emit('state', 'SERVER', user + '上线了');
        });
        socket.on('sendMSG', function (msg) {
            socket.emit('chat', socket.user, msg);
            socket.broadcast.emit('chat', socket.user, msg);
        });

    });

};
module.exports = router;
