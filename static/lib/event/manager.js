"use strict";

// Manage all event
define([], function () {
  var eventMap = {};

  var Bus = {
    trigger: function trigger(event) {
      console.log("trigger and event handle " + event);

      if (!eventMap[event]) {
        return;
      }

      eventMap[event].map(function (handler) {
        handler();
      });
    },

    register: function register(event, handler) {
      if (!eventMap[event]) {
        eventMap[event] = [];
      }
      eventMap[event].push(handler);
    },

    unregister: function unregister(event, handler) {
      if (!eventMap[event]) {
        return;
      }

      var index = eventMap[event].indexOf(handler);
      if (index > -1) {
        array.splice(index, 1);
      }
    },

    clear: function clear(event) {
      if (!eventMap[event]) {
        return;
      }

      eventMap[event] = [];
    }
  };

  return Bus;
});