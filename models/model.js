var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/test', {
  useMongoClient: true,
});

var Schema = mongoose.Schema;
var testSchema = new Schema({
  age: Number,
  id: String
});
var Test = mongoose.model('Test', testSchema);

var test = new Test({
  age: 18,
  id: 'zt'
});

test.save(function(err) {
  if (err) {
    console.log(err)
  } else {
    console.log('yes')
  }
});