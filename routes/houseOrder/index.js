var express = require('express');
var router = express.Router();
var db = require('../../model/mysql');
var request = require('request')

router.post('/addHouseOrder',function(req,res,next){
   let {rentStar,rentend ,houseId,couponValue,totalValue,status}=req.body
   let sql ='insert into houseOrder(rentStar,rentend ,houseId,couponValue,totalValue,status) values(?,?,?,?,?,?)'
   db.query(sql,[rentStar,rentend ,houseId,couponValue,totalValue,status],function(result,field){
    res.send({
        code:200,
        data:result
    })
   })
})

router.get('/getHouseOrder',function(req,res,next){
    let {id}=req.query
    let sql = 'select * from houseOrder o,mingsuadd m where m.houseId=o.houseId and o.id=?'
    
    db.query(sql,[id],function(result,field){
        res.send({
            code:200,
            data:result[0]
        })
    })
})

router.get('/getAllHouseOrder',  function(req,res,next){
    let sql ='select * from houseOrder'
    db.query(sql,[],function(result,field){
        console.log(result);
        
        res.send({
            code:20000,
            data:result
        })
    })

})
module.exports=router