var React = require('react');
var ProductActions = require('../actions/product-actions');
var ProductStore = require('../stores/product-store');

function getProductState() {
  return {
    selectedId: ProductStore.getSelectedId(),
    generators: ProductStore.getGenerators(),
    loadingBar: ProductStore.getLoadingBar()
  }
}

var Product = React.createClass({

  getInitialState: function() {
    return getProductState();
  },

  _onChange: function() {
    this.setState(getProductState());
    // console.log(this.state.loadingBar);
  },

  setSelect: function(idx) {
    ProductActions.selectProduct(idx);
    ProductActions.loadNews();
  },

  componentDidMount: function() {
    ProductStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    ProductStore.removeChangeListener(this._onChange);
  },

  render: function() {
    var liStyle = {
      display: 'none'
    }

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
        <ol>
          {this.state.generators.map((item, idx) => {
            return(<li key={idx}>{item}</li>)
          })}

          <li style={this.state.loadingBar ? {} : liStyle}>loading...</li>

        </ol>
      </div>
    )
  }
});

module.exports = Product;
