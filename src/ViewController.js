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
