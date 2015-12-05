var FluxCartActions = require('../actions/flux-cart-actions');

module.exports = {
  getProductData: function() {
    var data = JSON.parse(localStorage.getItem('product'));
    FluxCartActions.receiveProduction(data);
  }
}
