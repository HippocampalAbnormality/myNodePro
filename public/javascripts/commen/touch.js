;(function($) {
  var touch = {},
      touchTimeout,
      tapTimeout,
      swipeTimeout,
      longTapTimeout,
      longTapDelay = 750,
      gesture,
      down,
      up,
      move,
      eventMap,
      initialized = false;

  function swipeDirection(x1, x2, y1, y2) {
    return Math.abs(x1 - x2) >= Math.abs(y1 - y2) ? (x1 - x2 > 0 ? 'Left' : 'Right') : (y1 - y2 > 0 ? 'Up' : 'Down');
  };

  function longTap() {
    longTapTimeout = null;
    if (touch.last) {
      touch.el.trigger('longTap');
      touch = {};
    };
  };

  function cancelLongTap() {
    if (longTapTimeout) clearTimeout(longTapTimeout);
    longTapTimeout = null;
  };

  function cancelAll() {
    if (touchTimeout) clearTimeout(touchTimeout);
    if (tapTimeout) clearTimeout(tapTimeout);
    if (swipeTimeout) clearTimeout(swipeTimeout);
    if (longTapTimeout) clearTimeout(longTapTimeout);
    touchTimeout = tapTimeout = swipeTimeout = longTapTimeout = null;
    touch = {};
  };

  function isPrimaryTouch(event) {
    return (event.pointerType == 'touch' || event.pointerType == event.MSPOINTER_TYPE_TOUCH) && event.isPrimary;
  };

  function isPointerEventType(e, type) {
    return (e.type == 'pointer'+type || e.type.toLowerCase() == 'mspointer'+type);
  };

  function unregisterTouchEvents() {
    if (!initialized) return;
    $(document).off(eventMap.down, down)
      .off(eventMap.up, up)
      .off(eventMap.up, up)
      .off(eventMap.cancel, cancelAll);
    $(window).off('scroll', cancelAll);
    cancelAll();
    initialized = false;
  };

  function setup(__eventMap) {
    var now, delta, deltaX = 0, deltaY = 0, firstTouch, _isPointerType;
    unregisterTouchEvents();
    eventMap = ()
  };
})(Zepto);