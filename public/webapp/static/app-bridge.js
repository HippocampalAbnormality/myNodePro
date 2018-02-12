;(function() {
  window.BRIDGE = {
    // 打开智齿客服
    openSobot: function(mode) {
      if (window.javaObj) {
        javaObj.openSobot(mode);
      } else {
        window.webkit.messageHandlers.openSobot.postMessage({"mode":mode});
      }; 
    },

    // 当前页面内容是否滑动到了顶部
		isTop: function(isTop) {
      if (window.javaObj) {
        javaObj.isTop(isTop);
      } else {
        window.webkit.messageHandlers.isTop.postMessage({"isTop":isTop});
      };
    },

    // 用户登录成功
		loginSuccess: function(uuid) {
      if (window.javaObj) {
        javaObj.loginSuccess(uuid);
      } else {
        window.webkit.messageHandlers.loginSuccess.postMessage({"uuid":uuid});
      };
    },

    // 用户退出
    logout: function() {
      if (window.javaObj) {
        javaObj.logout();
      } else {
        window.webkit.messageHandlers.logout.postMessage({});
      };
    },

    // 用户登录成功之后，H5告诉移动端标识用户登录状态的Cookie
		setCookie: function(key, value) {
      if (window.javaObj) {
        javaObj.setCookie(key, value);
      } else {
        window.webkit.messageHandlers.setCookie.postMessage({"key":key, "value":value});
      };
    },

    jump: function() {
      if (window.javaObj) {
        javaObj.jump();
      } else {
        window.webkit.messageHandlers.jump.postMessage({});
      };
    }
  }
})();