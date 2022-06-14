require('dotenv').config();
const mysql = require('mysql2');

const pool = mysql.createPool({
    host:'us-cdbr-east-05.cleardb.net',
    user:'b37da2c89588da',
    password:'16433f56',
    database:'heroku_e1572fbcdfa25eb',
    connectionLimit:10,
    waitForConnections:true,
    dateStrings: true
})

module.exports = pool.promise();