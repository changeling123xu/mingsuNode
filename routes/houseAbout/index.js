var express = require('express');
var router = express.Router();
var db = require('../../model/mysql');
var request = require('request')
router.get('/houserComment', function (req, res, next) {
    let { houseId } = req.query
    let sql = 'select * from houseComment where houseId=?'
    db.query(sql, [houseId], function (result, fields) {
        return res.send({
            code: 200,
            data: result
        })
    })
})
//----------------后端
router.get('/getHouseCount', function (req, res, next) {
    let { houseId } = req.query
    let sql = 'SELECT COUNT(*) as count ,c.cityname FROM cityList01 c JOIN mingsuadd m on m.cityId=c.cityidYj GROUP BY c.cityname ORDER BY COUNT(m.cityId) DESC '
    db.query(sql, [houseId], function (result, fields) {
        return res.send({
            code: 20000,
            data: result
        })
    })
})

module.exports = router