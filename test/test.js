var db=require('../model/mysql');
var Mock = require('mockjs');
// 查询实例
// insert into renter(user_id,house_id,rent_name,rent_email,rent_phone,rent_image,rent_time,rent_address
var mocs=Mock.mock({
  user_id:'',
  house_id:'',
  rent_name:'@cname()',
  rent_time:'@date',
  rent_email:'@email',
  rent_phone:/1\d{10}/
})
var moc = Mock.mock({
    user_id: '@increment',
    timestamp: +Mock.Random.date('T'),
    author: '@first',
    reviewer: '@first',
    title: '@title(5, 10)',
    content_short: 'mock data',
    content: baseContent,
    forecast: '@float(0, 100, 2, 2)',
    importance: '@integer(1, 3)',
    'type|1': ['CN', 'US', 'JP', 'EU'],
    'status|1': ['published', 'draft', 'deleted'],
    display_time: '@datetime',
    comment_disabled: true,
    pageviews: '@integer(300, 5000)',
    image_uri,
    platforms: ['a-platform']
  })
db.query('SELECT * FROM user;', [],function(result,fields){
    console.log('查询结果：');
    console.log(result);
});
console.log(moc);

// var sql='insert into '
// db.query(sql,[],function(result,fields){

// })
