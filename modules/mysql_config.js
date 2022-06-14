require('dotenv').config();
const mysql = require('mysql2');

const pool = mysql.createPool({
    host:us-cdbr-east-05.cleardb.net,
    user:b1b529bee2e41d,
    password:735fced4,
    database:heroku_5472fd0cc8e83fb,
    connectionLimit:10,
    waitForConnections:true,
    dateStrings: true
})

module.exports = pool.promise();