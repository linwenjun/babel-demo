var AppDispatcher = require('../dispatcher/app-dispatcher');
var ProductConstants = require('../constants/product-constants');
var $ = require('jquery');

var ProductActions = {
  selectProduct: function(index) {
    AppDispatcher.handleAction({
      actionType: ProductConstants.SET_SELECTED,
      data: index
    })
  },

  loadNews: function() {
    var url = 'http://api.flickr.com/services/feeds/photos_public.gne?tags=cat&tagmode=any&format=json&jsoncallback=?'

    AppDispatcher.handleAction({
      actionType: ProductConstants.SET_LOADINGBAR,
      data: true
    })

    $.getJSON(url, function(data) {
      AppDispatcher.handleAction({
        actionType: ProductConstants.ADD_GENERATOR,
        data: data.generator
      })
    })
  }
}

module.exports = ProductActions;
