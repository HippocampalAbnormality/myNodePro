// 微信分享接口
window.onload = function () {
  wx.config({
    debug: false,       // 调试阶段设为 true，可以看到报错信息
    appId: '<{$appid}>',
    timestamp: '<{$timestamp}>',
    nonceStr: '<{$noncestr}>',
    signature: '<{$signature}>',
    jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareQZone', 'onMenuShareWeibo']
  });

  wx.ready(function () {
    var title = 'iSeecapital您的智慧财富管理伙伴';
    var desc = 'iSeecapital依托Fintech（金融科技）力量打造的互联网财富管理平台,国内唯一致力于五大战略新兴板块,发行以上市公司为主体的类固收私募基金产品的互联网财富平台 。';
    var link = 'https://www.iseecapital.com/webapp';
    var imgUrl = 'https://www.iseecapital.com/static_res/img/originImg/iSeecapital-logo.jpg';

    // var data = {
    //   url: link,
    //   title: title,
    //   sign: itzshare,
    //   description: desc
    // }
      
    // 分享到朋友圈
    wx.onMenuShareTimeline({
      title: title,
      link: link,
      imgUrl: imgUrl,
      success: function () {
        // shareCount('WechatTimeline', data);
      },
      cancel: function () {}
    })

    // 分享给朋友
    wx.onMenuShareAppMessage({
      title: title,
      desc: desc,
      link: link,
      imgUrl: imgUrl,
      type: '',
      dataUrl: '',
      success: function () {
        // shareCount('WechatSession', data);
      },
      cancel: function () {}
    })

    // 分享到 QQ
    wx.onMenuShareQQ({
      title: title,
      desc: desc,
      link: link,
      imgUrl: imgUrl,
      success: function () {
        // shareCount('QQ', data);
      },
      cancel: function () {}
    })

    // 分享到 QQ 空间
    wx.onMenuShareQZone({
      title: title,
      desc: desc,
      link: link,
      imgUrl: imgUrl,
      success: function () {
        // shareCount('QZone', data);
      },
      cancel: function () {}
    })

    // 分享到腾讯微博
    wx.onMenuShareWeibo({
      title: title,
      desc: desc,
      link: link,
      imgUrl: imgUrl,
      success: function () { 
        // shareCount('TencentWeibo', data);
      },
      cancel: function () {}
    })
  });

  wx.error(function (res) {});
}