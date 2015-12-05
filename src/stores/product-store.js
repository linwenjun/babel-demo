var AppDispatcher = require('../dispatcher/app-dispatcher');
var EventEmitter = require('events').EventEmitter;
var ProductConstants = require('../constants/product-constants');
var _ = require('underscore');

var _products = [];
var _selectedId = null;
var _generators = [];
var _loadingBar = false;

function setSelectedId(id) {
  _selectedId = id;
}

function addGenerator(data) {
  _generators.push(data);
  _loadingBar = false;
}

function setLoadingBar(isShow) {
  _loadingBar = isShow;
}

var ProductStore = _.extend({}, EventEmitter.prototype, {

  getProducts: function() {
    return _products;
  },

  getSelectedId: function() {
    return _selectedId;
  },

  getGenerators: function() {
    return _generators;
  },

  getLoadingBar: function() {
    console.log(1);
    return _loadingBar;
  },

  emitChange: function() {
    this.emit('change');
  },

  addChangeListener: function(callback) {
    this.on('change', callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener('change', callback);
  }
});

AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.actionType) {
    case ProductConstants.SET_SELECTED:
      setSelectedId(action.data);
      break;

    case ProductConstants.ADD_GENERATOR:
      addGenerator(action.data);
      break;

    case ProductConstants.SET_LOADINGBAR:
      setLoadingBar(action.data);
      break;

    default:
      return true;
  }

  ProductStore.emitChange();
  return true;
});

module.exports = ProductStore;
