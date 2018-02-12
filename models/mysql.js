var mysql = require('mysql');
// 链接数据库
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database : 'test'
});

// 链接
connection.connect();

// 查询语句
connection.query('SELECT * from a1', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].id);
});