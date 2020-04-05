var express = require('express');
var router = express.Router();
var db=require('../model/mysql.js');
// var {query}= require('../model/asynmysql')
/* GET home page. */
// router.get('/api/table/list', function(req, res, next) {
//   db.query('select * from User', [],function(result,fields){
//     console.log('查询结果：');
//     console.log(result);
// });
//   let item={
//     id: '@id',
//     title: '@sentence(10, 20)',
//     status: ['published'],
//     author: 'name',
//     display_time: '@datetime',
//     pageviews: '@integer(300, 5000)'
//   }
//   res.render({
//     code: 20000,
//     data: {
//       total: items.length,
//       items: items
//     }
//   });
// });
// router.get('/apis/table/list', async function(req,res,next){
//   async function  getRouterList(){
//     let sql = 'select * form renter'
//     let result = await query(sql)
//     return result
//   }
//   let result= await getRouterList()
//   return res.send({
//     code:20000,
//     data:result
//   })
// })
module.exports = router;
