var AppDispatcher = require('../dispatcher/app-dispatcher');
var ProductConstants = require('../constants/product-constants');

var ProductActions = {
  selectProduct: function(index) {
    AppDispatcher.handleAction({
      actionType: ProductConstants.SET_SELECTED,
      data: index
    })
  }
}

module.exports = ProductActions;
