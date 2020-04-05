var express = require('express');
var router = express.Router();
var db = require('../model/mysql');
var {query} = require('../model/asynmysql')
/* GET users listing. */
// router.get('/login', function (req, res, next) {
//   console.log(req.query.user);

//   res.send('respond with a resource');
// });
// 查询实例

router.post('/api/user/login', function (req, res, next) {
  let {
    username,
    password
  } = req.body
  let sql = 'select token from user where username=? and password=?'
  db.query(sql, [username, password], function (result, fields) {
    if (result.length > 0) {
      return res.send({
        code: 20000,
        data: {
          token: result[0].token
        }
      })
    }
    return res.send({
      code: 60204,
      message: 'Account and password are incorrect.'
    })
  });


});


router.get('/api/user/info', function (req, res, next) {
  let {
    token
  } = req.query
  console.log(req.query)

  let sql = 'select roles, introduction, avatar, username from user where token=?'
  db.query(sql, [token], function (result, fields) {
    if (result.length > 0) {
      console.log(result[0]);

      return res.send({
        code: 20000,
        data: {
          role: result[0].roles,
          introduction: result[0].introduction,
          avatar: result[0].avatar,
          name: result[0].username
        }
      })
    }
    return {
      code: 50008,
      message: 'Login failed, unable to get user details.'
    }


  })
})


router.post('/api/user/logout', function (req, res, next) {

  res.send({
    code: 20000,
    data: 'success'
  })
})


//--------------------------------- 异步获取未读租客发送的消息
router.get('/api/user/rent_message',async function (req, res, next) {
  let data=null
  async function getMessage() {
    let sql = 'SELECT * from rent_send_message s, renter r where r.house_id =s.renter_id and s.message_type=1;'
    let result= await query(sql, [])
    return result
  }
   async function getAllMessage() {
    let data = await getMessage()
    
    let resultes =await Promise.all( data.map(async item => {
      // console.log(item);
      
      let mes = {}
      let mesg=[]
      if (item.mesage_haveimage) {
        
          let sql = 'select ms_url from send_message_image where ms_id=?'
          mesg=await query(sql, [item.renter_id])
          console.log(mesg);

      }
      return mes = {
        renterId: item.renter_id,
        renterTime: item.renter_time,
        renterMessage: item.renter_message,
        renterName: item.rent_name,
        renterEmail: item.rent_email,
        renterPhone: item.rnet_phone,
        renterImage: mesg
      }
    
    }))
    return resultes

  }
  data =await getAllMessage()
  return res.send({
    code: 20000,
    data: {
      data
    }
  });

})

//-------------------------------获取租客所有信息
router.get('/api/table/list', async function(req,res,next){
  async function  getRouterList(){
    let sql = 'select * from renter'
    let result = await query(sql)
    return result
  }
  let result= await getRouterList()
  return res.send({
    code:20000,
    data:result
  })
})

//-------------------------------修改和新增租客所有信息
router.post('/api/table/renter', async function(req, res, next){
  
  async function updateRenter(mess){
    let sql='update renter set rent_name=?,rent_email=?,rent_phone=?,rent_image=?,rent_time=?,rent_address=? where user_id=?'
    let code = query(sql,[mess.rent_name,mess.rent_email,mess.rent_phone,mess.rent_image,mess.rent_time,mess.rent_address,mess.user_id])
    return code
  }
  async function addRenter(mess){
    // let sql ='insert into renter (user_id,house_id,rent_name,rent_email,rent_phone,rent_image,rent_time,rent_address) values(?,?,?,?,?,?,?,?,?)'
    // let code = query(sql,[mess.user_id,mess.house_id,mess.rent_name,mess.rent_email,mess.rent_phone,mess.rent_image,mess.rent_time,mess.rent_address,mess.user_id])
    let sql= 'insert into renter(user_id,house_id,rent_name,rent_email,rent_phone,rent_image,rent_time,rent_address) values(?,?,?,?,?,?,?,?)'
    let code = query(sql,[mess.user_id,mess.house_id,mess.rent_name,mess.rent_email,mess.rent_phone,mess.rent_image,mess.rent_time,mess.rent_address])
    return code
  }
  async function selectId(id){
    let sql='select user_id from renter where user_id=?' 
    let isId=query(sql,[id])
    return isId
  }
  let isId= await selectId(req.body.user_id)
  let code=null
  if(isId.length>0){
    code =await updateRenter(req.body)
  }else{
    code=await addRenter(req.body)
  }
  return res.send({
    code:20000,
    data:code
  })
})

router.get('/api/table/delete', function(req,res,next){
  let sql ='delete from renter where user_id=?'
  db.query(sql,[req.query.user_id],function(result,fields){
    return res.send({
      code:20000,
      data:result
    })
  })
})

//-------------------------------get 房源信息
router.get('/api/table/getHouse', async function(req, res, next){
  let data = req.query
  let houseList =[]
  console.log(data);
  
  async function getAllHouse(){
    let sql = 'select * from houser'
    return query(sql,[])
  }
  async function getOneHouse(){
    let sql = 'select * from houser where house_id=?'
    return query(sql,[data.house_id])
  }
  if(data.house_id){
    houseList = await getOneHouse()
  }else{
    houseList = await getAllHouse()
  }
  return res.send({
    code:20000,
    data:houseList
  })

})

//-------------------------------get all服务信息
router.get('/api/table/getHouseAllServer' ,function(req,res, next){
  let sql = 'select * from serviceFacilities'
  db.query(sql, [], function(result,fields){
    return res.send({
      code:20000,
      data:result
    })
  })
})
//-------------------------------修改和添加房源信息
router.post('/api/table/updateHouse', async function(req, res, next){
  let data=null
  let reqData=req.body
  console.log(reqData,'123');

  async function updateHouseMessage(data){
    console.log(1);
    
    let {house_id,house_name,house_area, house_price,house_image,house_status,house_servers,house_descrip,house_rentTime,house_rentDay,house_type}=data
    
    let sql ='update houser set house_name=?,house_area=?,house_price=?,house_image=?,house_status=?,house_servers=?,house_descrip=?,house_rentTime=?,house_rentDay=?,house_type=? where house_id=?'
    return query(sql,[house_name,house_area, house_price,house_image,house_status,house_servers,house_descrip,house_rentTime,house_rentDay,house_type,house_id])
  }
  async function addHouseMessage(data){
    console.log(2);
    
    let {house_id,house_name,house_area, house_price,house_image,house_status,house_servers,house_descrip,house_rentTime,house_rentDay,house_type}=data
    console.log(house_id,123);
    
    let sql ='insert into houser(house_id,house_name,house_area, house_price,house_image,house_status,house_servers,house_descrip,house_rentTime,house_rentDay,house_type)'+
      'values(?,?,?,?,?,?,?,?,?,?,?)'
      return query(sql,[house_id,house_name,house_area, house_price,house_image,house_status,house_servers,house_descrip,house_rentTime,house_rentDay,house_type])
  }
  async function selectId(id){
    let sql='select house_id from houser where house_id=?' 
    let isId=query(sql,[id])
    return isId
  }
  let flag = await selectId(reqData.house_id)
  
  if(flag.length>0){
    data=await updateHouseMessage(reqData)
  }else{
    data= await addHouseMessage(reqData)
  }
  return res.send({
    code:20000,
    data:data
  })
})
//-------------------------------删除房源信息
router.post('/api/table/deleteHouse', function(req,res,next){
  let sql ='delete from houser where house_id=?'
  db.query(sql,[req.body.house_id],function(result,fields){
    return res.send({
      code:20000,
      data:result
    })
  })
})
module.exports = router;