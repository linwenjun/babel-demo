global.React = require('react');
var ReactDOM = require('react-dom');
var ProductData = require('./product-data');
var CartApi = require('./utils/cart-api');
// var TWAHeader = require('./components/twa-header');
var FluxCartApp = require('./components/flux-cart-app.react');

ProductData.init();

CartApi.getProductData();

ReactDOM.render(
  <FluxCartApp />,
  document.getElementById('index-div')
)
