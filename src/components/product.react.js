var React = require('react');
var ProductActions = require('../actions/product-actions');
var ProductStore = require('../stores/product-store');

function getProductState() {
  return {
    selectedId: ProductStore.getSelectedId()
  }
}

var Product = React.createClass({

  getInitialState: function() {
    return getProductState();
  },

  _onChange: function() {
    this.setState(getProductState());
  },

  setSelect: function(idx) {
    ProductActions.selectProduct(idx);
  },

  componentDidMount: function() {
    ProductStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    ProductStore.removeChangeListener(this._onChange);
  },

  render: function() {
    return (
      <div>
        <h1>Hello,world!</h1>
        <ul>
          {this.props.product.map((item, idx) => {
            return (
              <li className={"pointer " + (idx===this.state.selectedId ? "selected" : "")} onClick={this.setSelect.bind(this, idx)} key={idx}>{item.name}</li>
            )
          })}
        </ul>
      </div>
    )
  }
});

module.exports = Product;
