var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('register/regSuc', {
    title: '注册成功'
  });
});

router.get('/es6', function(req, res, next) {
  res.render('register/dist/testEs6', {
    
  });
});
module.exports = router;