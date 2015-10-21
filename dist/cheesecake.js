(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Cheesecake = {
  model: {
    Model: require('./Model.js')
  },
  viewController: {
    ViewController: require('./ViewController.js')
  },
  mixin: {
    Mixin: require('./Mixin.js')
  }
};


function registerComponent(componentName, componentType, reference) {
  var component = Cheesecake[componentType.toLowerCase()][componentName];
  if(component) {
    throw new Error(componentName + ' component was already registered');
  }
  Cheesecake[componentType.toLowerCase()][componentName] = reference;
}

function getComponent(componentName, componentType) {
  var component = Cheesecake[componentType.toLowerCase()][componentName];
  if(!component) {
    throw new Error(componentName + ' does not exist');
  }
  return component;
}

// global event system?

module.exports = {
  registerComponent: registerComponent,
  getComponent: getComponent
};

},{"./Mixin.js":2,"./Model.js":3,"./ViewController.js":4}],2:[function(require,module,exports){
var Cheesecake = require('./Cheesecake.js');

var Mixin = function() {

};

Mixin.create = function() {

};

module.exports = Mixin;

},{"./Cheesecake.js":1}],3:[function(require,module,exports){
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

  var parent = Cheesecake.getComponent(ParentModel, 'model');
  this.parent = parent || null;
  
  var model = Cheesecake.getComponent('Model', 'model');
  if(model) {
    model.call(this);    
  }

  for(var i = 0; i < mixins.length; i++) {
    var mixin = Cheesecake.getComponent(mixins[i], 'mixin');
    if(mixin) {
      mixin.call(this);
    }
  }
};

Model.create = function(name, options) {
  var model = new ModelConstructor(options.state, options.eventHandlers, options.ParentModel, options.mixins);
  try {
    Cheesecake.registerComponent('model', name, model);  
    return model;    
  } catch(e) {
    throw new Error('Component could not be registered');
  }
}

module.exports = Model;

},{"./Cheesecake.js":1}],4:[function(require,module,exports){
var Cheesecake = require('./Cheesecake.js');

var ViewController = function() {

};

var ViewControllerConstructor = function(el, init, render, model) {
  this.el = el;
  this.model = model;
  this.render = render;

  init.call(this);
};

ViewController.create = function(name, options) {
  return new ViewControllerConstructor(options.el, options.init, options.render, options.model);
}

module.exports = ViewController;

},{"./Cheesecake.js":1}],5:[function(require,module,exports){
module.exports = {
  Model: require('./Model.js'),
  ViewController: require('./ViewController.js'),
  Mixin: require('./Mixin.js')
};

},{"./Mixin.js":2,"./Model.js":3,"./ViewController.js":4}]},{},[5]);
