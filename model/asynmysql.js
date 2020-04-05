const mysql = require('mysql')
var databaseConfig = require('./mysql.config'); //引入数据库配置模块中的数据
const pool = mysql.createPool(databaseConfig)

let query = function( sql, values ) {
    return new Promise(( resolve, reject ) => {
      pool.getConnection(function(err, connection) {
        if (err) {
          reject( err )
        } else {
          connection.query(sql, values, ( err, results) => {
  
            if ( err ) {
              reject( err )
            } else {
              resolve( results )
            }
            connection.release()
          })
        }
      })
    })
  }
  module.exports = { query }