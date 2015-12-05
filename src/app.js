global.React = require('react');
var ReactDOM = require('react-dom');
var Product = require('./components/product.react');

var data = ["Apple", "Banana", "Orange", "Egg", "Bug"];
var data = [
  {name:"Apple", count: 10},
  {name:"Banana", count: 10},
  {name:"Orange", count: 10}
]

ReactDOM.render(
  <Product product={data}/>,
  document.getElementById('index-div')
)
