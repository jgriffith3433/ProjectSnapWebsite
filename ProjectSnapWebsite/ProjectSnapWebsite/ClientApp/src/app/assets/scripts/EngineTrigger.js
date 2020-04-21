//(function (global, undefined) {
//  "use strict";

//  var document = global.document
//  var EngineTrigger;
//  var EngineEvent = {
//    create: function (eventName) {

//      return {
//        eventName: eventName,
//        callbacks: [],
//        registerCallback: function (callback) {
//          this.callbacks.push(callback);
//        },
//        unregisterCallback: function (callback) {
//          var callbackIndex = this.callbacks.indexOf(callback);

//          if (callbackIndex > -1) {
//            this.callbacks.splice(callbackIndex, 1);
//          }
//        },
//        fire: function (data) {
//          var callbacks = this.callbacks.slice(0);
//          callbacks.forEach(function (callback) { callback(data); });
//        }
//      };
//    },
//  };

//  EngineTrigger = function () {
//    var _EngineTrigger = {};
//    _EngineTrigger = {
//      events: {},
//      dispatch: function (eventName, data) {
//        var event = this.events[eventName];
//        if (event) {
//          event.fire(data);
//        }
//      },
//      on: function (eventName, callback) {
//        var event = this.events[eventName];
//        if (!event) {
//          event = EngineEvent.create(eventName);
//          this.events[eventName] = event;
//        }

//        event.registerCallback(callback);
//      },
//      off: function (eventName, callback) {
//        var event = this.events[eventName];
//        if (event) {
//          event.unregisterCallback(callback);
//          if (event.callbacks.length === 0) {
//            delete this.events[eventName];
//            //this.events[eventName] = null;
//          }
//        }
//      }
//    };

//    return {
//      dispatch: function (e, t, n) { _EngineTrigger.dispatch(eventName, data); return this; },
//      init: _EngineTrigger.init,
//    };
//  };

//  // AMD and window support
//  if (typeof define === "function") {
//    define([], function () { return new EngineTrigger(); });
//  } else if (typeof global.EngineTrigger === "undefined") {
//    global.EngineTrigger = new EngineTrigger();
//  }

//}(window));

window.FireUIEvent = function(eventName, payload) {
	var event = {
		eventName: eventName,
		payload: payload
	};

	var message = JSON.stringify(event);
	console.log('UI event fired: ', event);
	gameInstance.SendMessage('UIEventDispatcher', 'ProcessEvent', message);
};

window.EngineEvent = {
  create: function (eventName) {
    return {
      eventName: eventName,
      callbacks: [],
      registerCallback: function (callback) {
        this.callbacks.push(callback);
      },
      unregisterCallback: function (callback) {
        var callbackIndex = this.callbacks.indexOf(callback);

        if (callbackIndex > -1) {
          this.callbacks.splice(callbackIndex, 1);
        }
      },
      fire: function (data) {
        var callbacks = this.callbacks.slice(0);
        callbacks.forEach(function (callback) { callback(data); });
      }
    };
  },
};

window.EngineTrigger = {
    events: {},
    dispatch: function (eventName, data) {
      var event = this.events[eventName];
      if (event) {
        event.fire(data);
      }
    },
    on: function (eventName, callback) {
      var event = this.events[eventName];
      if (!event) {
        event = window.EngineEvent.create(eventName);
        this.events[eventName] = event;
      }

      event.registerCallback(callback);
    },
    off: function (eventName, callback) {
      var event = this.events[eventName];
      if (event) {
        event.unregisterCallback(callback);
        if (event.callbacks.length === 0) {
          delete this.events[eventName];
          //this.events[eventName] = null;
        }
      }
    }
}


//TODO: This is supposed to hook into angular scripts
//window.DispatchEvent = function (eventName) {
//  this.eventName = eventName;
//  this.callbacks = [];

//  this.registerCallback = function (eventName) {
//    this.callbacks.push(callback);
//  }

//  this.unregisterCallback = function(callback) {
//    var callbackIndex = this.callbacks.indexOf(callback);

//    if (callbackIndex > -1) {
//      this.callbacks.splice(callbackIndex, 1);
//    }
//  }

//  this.fire = function(data) {
//    var callbacks = this.callbacks.slice(0);
//    callbacks.forEach((callback) => callback(data));
//  }
//};

//window.Dispatcher = {
//  events: {},
//  dispatch: function (eventName, data) {
//    var event = this.events[eventName];
//    if (event) {
//      event.fire(data);
//    }
//  },
//  on: function (eventName, callback) {
//    var event = this.events[eventName];
//    if (!event) {
//      event = new DispatchEvent(eventName);
//      this.events[eventName] = event;
//    }

//    event.registerCallback(callback);
//  },
//  off: function (eventName, callback) {
//    var event = this.events[eventName];
//    if (event) {
//      event.unregisterCallback(callback);
//      if (event.callbacks.length === 0) {
//        delete this.events[eventName];
//        //this.events[eventName] = null;
//      }
//    }
//  }
//}

//window.EngineTrigger.on("engine_event", (eventData) => {
//  Dispatcher.dispatch(eventData.eventName, eventData.payload);
//});
//window.EngineTrigger.on("engine_log", (message) => {
//  Dispatcher.dispatch("engine_log", message);
//});
