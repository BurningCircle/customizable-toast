"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

module.exports = function () {
  var container = null;
  var toasts = new Array();
  var count = 0;
  var delay = 3000;
  var type = {
    SUCCESS: 'success',
    ERROR: 'error',
    WARNING: 'warning',
    NOTIFICATION: 'notification'
  };

  function _createContainer() {
    if (!container) {
      container = document.createElement('div');
      document.body.appendChild(container);
      container = _addStylesToContainer(container);
    }
  }

  ;

  function _addStylesToContainer(container) {
    container.classList.add('toast-container');
    var style = container.currentStyle || window.getComputedStyle(container);

    if (style.position === 'static') {
      var styles = {
        position: 'fixed',
        display: 'inline-block',
        top: '40px',
        right: '40px'
      };

      for (var _i = 0, _Object$keys = Object.keys(styles); _i < _Object$keys.length; _i++) {
        var key = _Object$keys[_i];
        container.style[key] = styles[key];
      }
    }

    return container;
  }

  ;

  function _createNotification(message, type) {
    var notif = document.createElement('div');
    var id = Date.now();
    notif.id = id;
    notif.innerHTML = message;
    notif.classList.add('toast');
    notif.classList.add("toast-".concat(type));
    notif.style.overflow = 'hidden';
    container.appendChild(notif);
    toasts.push({
      id: id,
      notif: notif
    });
    setTimeout(function () {
      var element = toasts.find(function (element) {
        return element.id === id;
      });
      var notif = element.notif;
      var style = notif.currentStyle || window.getComputedStyle(notif);
      var transition = parseFloat(style.transition.split(' ')[1].replace('s', ''));

      if (transition) {
        notif.addEventListener('transitionend', function () {
          notif.style.padding = 0;
          notif.style.height = 0;
          notif.style.marginBottom = 0;
          var delay;

          try {
            delay = 1000 * transition;
          } catch (err) {
            delay = 1000;
          }

          setTimeout(function () {
            _removeNotification(element);
          }, delay);
        });
      } else {
        _removeNotification(element);
      }

      notif.classList.add('toast-remove');
      notif.style.opacity = 0;
    }, delay);
  }

  ;

  function _removeNotification(element) {
    try {
      container.removeChild(element.notif);
      toasts.splice(toasts.indexOf(element), 1);

      if (toasts.length === 0) {
        document.body.removeChild(container);
        container = null;
      }
    } catch (err) {}
  }

  ;

  function _getVarName(variable) {
    return Object.keys(variable)[0];
  }

  return {
    success: function success(message) {
      _createContainer();

      _createNotification(message, type.SUCCESS);
    },
    error: function error(message) {
      _createContainer();

      _createNotification(message, type.ERROR);
    },
    warning: function warning(message) {
      _createContainer();

      _createNotification(message, type.WARNING);
    },
    notification: function notification(message) {
      _createContainer();

      _createNotification(message, type.NOTIFICATION);
    },
    setDelay: function setDelay(newDelay) {
      if (!isNaN(newDelay)) {
        delay = parseInt(newDelay);
      } else {
        console.table(_defineProperty({
          library: 'Customizable toast',
          error: 'Wrong type of delay param'
        }, _getVarName({
          delay: delay
        }), newDelay));
      }
    }
  };
}();
