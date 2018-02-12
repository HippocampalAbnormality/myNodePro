$(window).on('touchstart', function(e) {
  e.preventDefault();
});
// $('*').on('contextmenu', function(e) {
//   e.preventDefault();
// });
window.onload = function() {
  // $.ajax({
  //   url: '/ajax/test',
  //   type: 'get',
  //   data: {},
  //   async: false,
  //   success: function(res) {
  //     console.log(res)
  //   }
  // });
  console.log(2333)
  var tits = $('.title'),
      secs = $('.sec'),
      arr = [];
  tits.each(function(i, v) {
    arr.push($(v).offset().top);
  });  

  
  
  window.addEventListener('scroll', function() {
    repaint();
  }, false);

  function repaint() {
    var num = sort(document.documentElement.scrollTop || document.body.scrollTop, arr);
    if (num == 0) {
      secs.removeClass('fixed').css('padding-top', 0);
    };
    if (num > 0) {
      secs.eq(num -1).addClass('fixed').css('padding-top', tits.eq(num -1).height()).siblings('.sec').css('padding-top', 0).removeClass('fixed'); 
    };
  };

  function sort(aim, arr) {
    if (aim < arr[0]) {
      return 0;
    };
    if (aim >=arr[0] && aim < arr[1]) {
      return 1;
    };
    if (aim >=arr[1] && aim < arr[2]) {
      return 2;
    };
    if (aim >=arr[2] && aim < arr[3]) {
      return 3;
    };
    if (aim >=arr[3] && aim < arr[4]) {
      return 4;
    };
    if (aim >=arr[4] && aim < arr[5]) {
      return 5;
    };
    if (aim >=arr[5] && aim < arr[6]) {
      return 6;
    };
  };

  var itz = {
    init: function() {
      this.bindEvent();
    },

    bindEvent: function() {
      var that = this;
      this.getDom.get('#hide').addEventListener('click', function() {
        that.getDom.get('#info').style.height = '13rem';
        that.getDom.get('.btn-shadow').style.display = 'block';
        that.getDom.get('#hide').style.display = 'none';

        
        arr = [];
        secs.removeClass('fixed').css('padding-top', 0);
        tits.each(function(i, v) {
          arr.push($(v).offset().top);
        }); 
        repaint();
      }, false);

      this.getDom.get('#show').addEventListener('click', function() {
        that.getDom.get('#info').style.height = 'auto';
        that.getDom.get('.btn-shadow').style.display = 'none';
        that.getDom.get('#hide').style.display = 'block';

        
        arr = [];
        secs.removeClass('fixed').css('padding-top', 0);
        tits.each(function(i, v) {
          arr.push($(v).offset().top);
        });
        repaint();
      }, false);
    },

    getDom: {
      doms: {},
      get: function(selector) {
        if (!this.doms[selector]) {
          this.doms[selector] = document.querySelector(selector);
        };
        return this.doms[selector];
      } 
    }
  };

  itz.init();
};