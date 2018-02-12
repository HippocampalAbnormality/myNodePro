var express = require('express');
var router = express.Router();

router.get('/aa', function(req, res, next) {
  res.render('activity/activity', {
    title: '活动页'
  });
});

router.get('/landingPage', function(req, res, next) {
  res.render('activity/landingPage', {
    title: 'landingPage'
  });
});

router.get('/rank', function(req, res, next) {
  res.render('activity/rankIntro');
});

router.get('/hongbao', function(req, res, next) {
  res.render('activity/hongbao');
});

router.get('/safe', function(req, res, next) {
  res.render('activity/safe');
});
router.get('/safeBaner', function(req, res, next) {
  res.render('activity/safeBaner');
});
router.get('/shuangdan', function(req, res, next) {
  res.render('activity/shuangdan');
});
router.get('/chongdingxiang', function(req, res, next) {
  res.redirect('/activity/shuangdan?back=123');
});
router.get('/jihua', function(req, res, next) {
  res.render('activity/pcjh');
});
router.get('/jihe', function(req, res, next) {
  res.render('activity/pcjihe');
});
router.get('/yqsy', function(req, res, next) {
  setTimeout(function() {
    res.render('activity/yuqishouyi', {
      test: new Date().getTime()
    });
  }, 2000);
});
router.get('/yyjg', function(req, res, next) {
  console.log(req.host);
  console.log(req.hostname);
  console.log(req.ip);
  console.log(req.port);
  console.log(req.query);
  res.cookie('name', '123');
  if (req.query.search === 'asdf') {
    res.clearCookie('name');
  };
  // next(); 开启这个，会自动跳到下一个中间件？我猜的，然后报了404

  res.render('activity/yuyuejieguo', {
    originalUrl: req.originalUrl,
    baseUrl: req.baseUrl,
    path: req.path,
    req: req,
    res: res,
    next: next,
  });
});
router.get('/jilu', function(req, res, next) {
  res.render('activity/jilu');
});
router.get('/suibian', function(req, res, next) {
  res.render('activity/suibian');
});
router.get('/zhixuanh5', function(req, res, next) {
  res.render('activity/zxh5');
});

router.get('/tequan', function(req, res, next) {
  // var obj = {
    
  // };
  // switch (req.query.special) {
  //   case '1':
  //     obj = {
  //       title: '生日礼包',
  //       jieshao:'爱投资为生日会员提供祝福礼包，会员在生日当天均能享受生日祝福。生日当天的等级越高，礼包越大。',
  //       shuoming: [
  //         '1.会员生日以注册时的身份证信息为准，当日0点所在的会员等级对应领取相应的礼包。',
  //         '2.生日当天起一周内可领取礼包，逾期不可领取。'
  //       ],
  //       xiangqing: [
  //         {
  //           a: '会员等级',
  //           b: '生日礼包'
  //         },
  //         {
  //           a: '<i class="rank-icon"></i>',
  //           b: '88'
  //         },
  //         {
  //           a: '<i class="rank-icon rank-icon-2"></i>',
  //           b: '188'
  //         },
  //         {
  //           a: '<i class="rank-icon rank-icon-3"></i>',
  //           b: '288'
  //         },
  //         {
  //           a: '<i class="rank-icon rank-icon-4"></i>',
  //           b: '588'
  //         },
  //         {
  //           a: '<i class="rank-icon rank-icon-5"></i>',
  //           b: '888'
  //         },
  //         {
  //           a: '<i class="rank-icon rank-icon-6"></i>',
  //           b: '1888'
  //         }
  //       ]
  //     };
  //     break;
  //   case '2':
  //     obj = {
  //       title: '升级礼包',
  //       jieshao:'人生，就是不断地打怪升级。在爱投资每一次升级，都有惊喜礼包等着你！等级越高，礼包越大~',
  //       shuoming: [
  //         '1.会员生日以注册时的身份证信息为准，当日0点所在的会员等级对应领取相应的礼包。',
  //         '2.生日当天起一周内可领取礼包，逾期不可领取。'
  //       ]
  //     };
  //     break;
  //   case '3':
  //     obj.cnt = '3333';
  //     break;
  //   default: 
  //     break;
  // };
  
  res.render('activity/tequan');

});

module.exports = router;