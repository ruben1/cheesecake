var Cheesecake = require('../src/index.js');

Cheesecake.ViewController.create('Main', {
  el: document.querySelector('#header'),
  init: function() {
    console.log('init called');
  },
  model: Cheesecake.Model.create('Main')
});
