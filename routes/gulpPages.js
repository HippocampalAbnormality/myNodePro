var express = require('express');
var router = express.Router();

router.get('/a', function(req, res, next) {
  res.render('gulpPages/gulpTest', {
    title: 'gulpTest'
  });
});

module.exports = router;