var len = ['空调','电视','电梯','冰箱','饮水机'
]
var chu=[
'调料',
'餐具',
'电饭煲',
'微波炉',
'电磁炉',
'烹饪锅具',
'燃气灶'
]
var yun = [
'淋浴',
'卫生纸',
'沐浴露/洗发水',
'浴缸',
'牙具',
'拖鞋',
'电吹风',
'24小时热水',
'毛巾'
]
var qi =[
'收费停车',
'专属管家',
'免费停车',
'智能入住'

]
var db = require('../model/mysql');
var Mock = require('mockjs');

// var mocs=Mock.mock({
//     user_id:'',
//     house_id:'',
//     rent_name:'@cname()',
//     rent_time:'@date',
//     rent_email:'@email',
//     rent_phone:/1\d{10}/
//   })

//   for(let i=2; i<100;i++){
//     var mocs=Mock.mock({
//         user_id:'',
//         house_id:'',
//         rent_name:'@cname()',
//         rent_time:'2019-'+'@date(MM-dd)',
//         rent_email:'@email',
//         rent_phone:/1\d{10}/,
//         rent_address:'@county(true)'
//       })
//     if(i<10){
//         mocs.user_id='a00'+i
//         mocs.house_id='h00'+i
//     }else{
//         mocs.user_id='a0'+i
//         mocs.house_id='h0'+i
//     }
//     let sql= 'insert into renter(user_id,house_id,rent_name,rent_email,rent_phone,rent_image,rent_time,rent_address) values(?,?,?,?,?,?,?,?)'
//     let code = db.query(sql,[mocs.user_id,mocs.house_id,mocs.rent_name,mocs.rent_email,mocs.rent_phone,mocs.rent_image,mocs.rent_time,mocs.rent_address],function(result,fildes){
//         console.log(result);
        
//     })
//   }
var is=312;
  for (let i=40;i<50;i++){
    var id='h00'+i;
    for(let j=0;j<8;j++){
        var num=parseInt(Math.random()*90+10)
        is++;
        var sql = `insert into houesr_image values('${is}','${id}','ia_100${num}')`
        db.query(sql,[],function(res,fidls){
            console.log('ok')
        })
    }
   
}
// for (var i=0;i<qi.length;i++){
//     var is=i+23;
//     var id='f'+is;
//     // if(is>13){id='f'+is}else{id='f0'+is}
//     var sql = `insert into serviceFacilities values('${id}','${qi[i]}')`
//     db.query(sql,[],function(res,fidls){
//         console.log('ok')
        
//     })
// }
