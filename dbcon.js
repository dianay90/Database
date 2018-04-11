var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_ohdi',
  password        : '1211',
  database        : 'cs340_ohdi'
});

module.exports.pool = pool;
