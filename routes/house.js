var express = require('express');
var router = express.Router();
var db = require('../model/mysql');
var request = require('request')

var {
    query
} = require('../model/asynmysql');
// var { houseComment } =
router.use('/houseAbout', require('./houseAbout'))
router.use('/uploadImage', require('./uploadImage'))
router.use('/houseOrder',require('./houseOrder'))
// router.get('/house/houserComment',houseComment(req,res,next))
router.post('/user/login', function (req, res, next) {
    let {
        phoneNumber,
        password
    } = req.body
    let sql = 'select * from user where rent_phone=?'
    db.query(sql, [phoneNumber], function (request, fileds) {

        if (request[0].rent_phone && request[0].password === password) {
            return res.send({
                code: 200,
                data: request[0].token

            })
        }
        return res.send({
            code: 50008,
            data: request

        })
    })


});
//--------------------更改个人信息
router.post('/user/updateInfo', function (req, res, next) {
    let {
        roles,
        introduction,
        avatar,
        name,
        phone,
        id
    } = req.body
    let sql = 'update user set roles=?,introduction=?,avatar=?,username=?,rent_phone=? where id=?'

    db.query(sql, [roles, introduction, avatar, name, phone, id], function (request, fileds) {
        return res.send({
            code: 200,
            data: request

        })
    })


});
router.get('/user/info', function (req, res, next) {
    let {
        token
    } = req.query
    let sql = 'select roles,introduction,avatar,username,rent_phone,id from user where token=?'
    db.query(sql, [token], function (request, fileds) {
        console.log(request[0].roles);

        return res.send({
            code: 200,
            data: {
                id: request[0].id,
                roles: request[0].roles,
                introduction: request[0].introduction,
                avatar: request[0].avatar,
                name: request[0].username,
                phone: request[0].rent_phone
            }
        })
    })

})

router.get('/house/list', async function (req, res, next) {
    let {
        cityId
    } = req.query
    let result = {
        cityId
    }
    if (cityId) {
        result = await getdefault(cityId)
        console.log(result);

    } else {
        result = await getAllCity()
    }
    async function getAllCity() { //获取所有房源数据
        let sql = 'select * from mingsuadd'
        return query(sql, [])
    }
    async function getdefault(id) { //获取指定城市房源数据
        let sql = "select * from mingsuadd where cityid=?"
        return query(sql, [id])
    }
    return res.send({
        code: 200,
        data: result
    })
})

// -------------------------------获取热门城市列表
router.get('/house/getCityList', function (req, res, next) {
    let {
        value
    } = req.query
    let sql = 'select * from cityList01 where  1=1 '
    let str = ''
    if (/^[\u4e00-\u9fa5]+$/.test(value)) {
        str = 'and cityname=?'
    } else if (/[A-Za-z]+/.test(value)) {
        str = 'and pinyin=?'
    }
    db.query(sql + str, [value], function (result, fileds) {
        return res.send({
            code: 200,
            data: result
        })
    })

})
// -------------------------------获取位置列表
router.get('/house/getlandmark', async function (req, res, next) {
    let sql = 'select * from landmark'
    let {
        cityId,
        landmarkType
    } = req.query
    db.query(sql, [], async function (result, fileds) {
        if (result.length > 0) {
            let url = `https://ftoy-api.58.com/api/duanzu/getLocaitonFirstList?cityId=${cityId}&landmarkType=${landmarkType}`
            let oneLevelDirectory = 1
            await request(url, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    // console.log(JSON.parse(body).result.data);
                    // console.log(response);
                    return res.send({
                        code: 200,
                        data: {
                            result: result,
                            oneLevelDirectory: JSON.parse(body).result.data.oneLevelDirectory
                        }
                    })
                }
            })
        }
    })

})
router.get('/house/getHouseDetail', async function (req, res, next) {
    let {
        houseId
    } = req.query
    let houseDetail = await getHouseDetail(houseId)
    let houseImage = await getHouseImage(houseId)
    async function getHouseDetail(houseId) {
        let sql = ' select * from mingsuadd where houseId=?'
        return query(sql, [houseId])
    }
    async function getHouseImage(houseId) {
        let sql = 'select houser_image from houesr_image where houser_id=?'
        return query(sql, [houseId])
    }
    console.log(houseImage);

    return res.send({
        code: 200,
        data: {
            houseDetail,
            houseImage
        }
    })
})

module.exports = router