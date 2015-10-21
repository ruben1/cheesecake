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
