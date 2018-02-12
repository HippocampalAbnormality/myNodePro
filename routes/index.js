var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Express',
    name: 'zt',
    age: '24' 
  });
});

router.get('/heyan', function(req, res, next) {
  res.render('heyan', { 
    title: '爱投资投资核验'
  });
});

router.get('/test', function(req, res, next) {
  res.render('swiper', { 
    title: 'test'
  });
});

router.get('/datajiechi', function(req, res, next) {
  res.render('observer', { 
    title: 'observer'
  });
});

router.get('/mvvm', function(req, res, next) {
  res.render('mvvm', { 
    title: 'mvvm'
  });
});

module.exports = router;
