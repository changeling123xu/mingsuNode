var express = require('express');
var router = express.Router();
var db=require('../model/mysql.js');
// var io = require('socket.io');
// router.get('/', function(req, res){
//     res.send('<h1>你好web秀</h1>');
//   });
  
//   io.on('connection',function(socket) {
//     //接收数据
//     socket.on('login', function (obj) {                
//         console.log(obj.username);
//         // 发送数据
//         socket.emit('relogin', {
//           msg: `你好${obj.username}`,
//           code: 200
//         });  
//     });
//   });
module.exports = router;
