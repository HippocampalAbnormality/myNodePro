// var mongoose = require('mongoose')
// var MovieSchema = require('../schema/movie')
// var Movie = mongoose.model('Movie', MovieSchema)

// module.exports = Movie

let MongoClient = require('mongodb').MongoClient;
let url = 'mongodb://localhost:27017/';

// 插入
// MongoClient.connect(url, function(err, db) {
// 	if (err) throw err;
// 	let dbo = db.db('runoob');
// 	let myobj = { name: '菜鸟教程', url: 'www.runoob' };
// 	dbo.collection('site').insertOne(myobj, function(err, res) {
// 		if (err) throw err;
// 		console.log('插入成功')
// 		db.close();
// 	});
// })

// 查询
MongoClient.connect(url, function(err, db) {
	if (err) throw err;
	let dbo = db.db('runoob'); // runoob是数据库
	let myobj = { name: '菜鸟教程', url: 'www.runoob' };
	// 未指定条件则返回集合中所有(这里site就是集合，也叫数据表)
	dbo.collection('site').find({}).toArray(function(err, result) {
		if (err) throw err;
		console.log(result);
		db.close();
	});
})

// 更多功能看http://www.runoob.com/nodejs/nodejs-mongodb.html