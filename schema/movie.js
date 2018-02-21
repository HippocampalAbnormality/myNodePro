var mongoose = require('mongoose')

var MovieSchema = new mongoose.Schema({
	age: Number,
	name: String,
	sex: String,
	meta: {
		createAt: {
			type: Date,
			default: Date.now()
		},
		updateAt: {
			type: Date,
			default: Date.now()
		}
	}
})

// 每次存储数据之前都会调用一下这个方法，类似监听存储事件
MovieSchema.pre('save', function(next) {
	if (this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now()
	} else {
		this.meta.updateAt = Date.now()
	}
	
	next()
})

MovieSchema.statics = {
	fetch: function(cb) {
		return this.find({}).sort('meta.updateAt')
		exec(cb)
	}
}

module.exports = MovieSchema