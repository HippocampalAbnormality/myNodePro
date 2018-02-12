
$(function() {
  var produce         = $('.produce'),
      register        = $('.register'),
      takeRedpacket   = $('.take-redpacket'),
      hack            = $('.hack'),
      btn             = $('.footer').find('.btn'),
      items           = produce.find('.sec'),
      invests         = produce.find('.invest'),
      send            = register.find('.send'),
      redpack         = register.find('.redpack'),
      tel             = register.find('.tel'),
      password        = register.find('.password'),
      code            = register.find('.code'),
      login           = register.find('.login'),
      errTip          = register.find('.err-tip'),
      box             = register.find('.box'),
      item1           = register.find('.item-1'),
      item2           = register.find('.item-2'),
      item3           = register.find('.item-3'),
      look            = register.find('.look'),
      code1           = register.find('.code1'),
      tip             = errTip.find('.tip');


      window.history && history.pushState && ( history.pushState({},""),history.pushState({},"") );
      

      //动态设置produce的sec高度
      items.height(items.width() * .25873);

      //动态设置图形验证码输入框宽度
      code1.innerWidth( register.width() - 102 );
      console.log(code1.innerWidth());
      
      //滚回顶部注册
      invests.on('click', function() {
          $('body,html').animate({
              scrollTop: 0
          }, 400);
      });

      //图标：点我领取红包
      hack.on('click', function() {
          $('body,html').animate({
              scrollTop: 0
          }, 400);
          // $('body,html').scrollTop(0);
      });



      //hack魅族浏览器输入框被遮挡
      var reg5 = /MZ\-/g,
          userAgent = navigator.userAgent;

      tel.on('focus', function() {
          charge();
      });
      password.on('focus', function() {
          charge();
      });

      function charge() {
          if (userAgent.match(reg5)) {
              if ( $('body').scrollTop() < 140 ) {
                  $('body,html').animate({
                      scrollTop: 140
                  }, 200);
              }
          }
      }
          
      
      


      var regerror = $('#reg_error');
      
      var reg1    = /手机号码/g,
          reg2    = /密码/g,
          reg3    = /短信/g,
          reg4    = /图形/g,
          phone   = register.find('input[name="phone"]'),
          phoneP  = phone.parent('.item'),
          pawd    = register.find('input[name="password"]'),
          pawdP   = pawd.parent('.item'),
          pvc     = register.find('input[name="phoneValicode"]'),
          pvcP    = pvc.parent('.item'),
          vc      = register.find('input[name="valicode"]'),
          vcP     = vc.parent('.item');

      var asdf = setInterval(function() {
          if ( regerror.html().match(reg1) ) {
              phone.addClass('err');
              phoneP.addClass('err');

              if (regerror.css('display') === 'none') {
                  phone.removeClass('err');
                  phoneP.removeClass('err');
              }

          } else {
              phone.removeClass('err');
              phoneP.removeClass('err');
          }


          if ( regerror.html().match(reg2)) {
              pawd.addClass('err');
              pawdP.addClass('err');

              if ( regerror.css('display') === 'none') {
                  pawd.removeClass('err');
                  pawdP.removeClass('err');
              }

          } else {
              pawd.removeClass('err');
              pawdP.removeClass('err');
          }

          if ( regerror.html().match(reg3)) {
              pvc.addClass('err');
              pvcP.addClass('err');

              if ( regerror.css('display') === 'none') {
                  pvc.removeClass('err');
                  pvcP.removeClass('err');
              }

          } else {
              pvc.removeClass('err');
              pvcP.removeClass('err');
          }

          if ( regerror.html().match(reg4) ) {
              vc.addClass('err');
              vcP.addClass('err');

              if ( regerror.css('display') === 'none') {
                  vc.removeClass('err');
                  vcP.removeClass('err');
              }

          } else {
              vc.removeClass('err');
              vcP.removeClass('err');
          }
      }, 100);
})   
  