var Cheesecake = require('./Cheesecake.js');

var Model = function(state, eventHandlers, ParentModel) {
  this.set = set;
  this.get = get;
  this.registerEvent = registerEvent;
  this.propagateEvent = propagateEvent;

  //////////
  

  function set(property, value) {
    this._state[property] = value;
  };

  function get(property, value) {
    return this._state[property];
  }

  function registerEvent(name, cb) {
    if(!this.viewCallbacks[name]) {
      this.viewCallbacks[name] = [];
    }
    this.viewCallbacks[name].push(cb);
  }

  function propagateEvent(property, value) {
    var callbacks = this.viewCallbacks[property];
    if(!callbacks) {return; }
    callbacks.forEach(function(callback) {
      callback(value);
    });
  };
};

var ModelConstructor = function(state, eventHandlers, ParentModel, mixins) {
  this._state = state;

  this.eventHandlers = eventHandlers;
  this.childCallbacks = {};
  this.viewCallbacks = {};

  if(parent) {
    var parent = Cheesecake.getComponent(ParentModel, 'model');    
  }
  this.parent = parent || null;

  mixins = mixins || [];
  for(var i = 0; i < mixins.length; i++) {
    var mixin = Cheesecake.getComponent(mixins[i], 'mixin');
    if(mixin) {
      mixin.call(this);
    }
  }
};

Model.create = function(name, options) {
  options = options || {};
  var model = new ModelConstructor(options.state, options.eventHandlers, options.ParentModel, options.mixins);
  try {
    Cheesecake.registerComponent(name, 'model', model);  
    return model;    
  } catch(e) {
    throw new Error('Component could not be registered');
  }
}

module.exports = Model;
