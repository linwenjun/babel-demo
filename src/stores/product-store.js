var AppDispatcher = require('../dispatcher/app-dispatcher');
var EventEmitter = require('events').EventEmitter;
var ProductConstants = require('../constants/product-constants');
var _ = require('underscore');

var _products = [];
var _selectedId = null;

function setSelectedId(id) {
  _selectedId = id;
}

var ProductStore = _.extend({}, EventEmitter.prototype, {

  getProducts: function() {
    return _products;
  },

  getSelectedId: function() {
    return _selectedId;
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

    default:
      return true;
  }

  ProductStore.emitChange();
  return true;
});

module.exports = ProductStore;
