var express = require('express');
var router = express.Router();
var data = {
  name: 'a',
  age: '12',
  sex: 'boy',
  a: '3'
};

router.get('/test', function(req, res, next) {
  setTimeout(function() {
    res.send({
      data: data,
      code: 0,
      info: '啊哈'
    });
  }, 3000);
});

module.exports = router;