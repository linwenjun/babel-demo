module.exports = {
  init: function() {
    localStorage.clear();
    localStorage.setItem('product', JSON.stringify([
      {
        name: "汽水",
        count: 10,
        unit: '瓶',
        variants: [
          {type: 101, price: 10}
        ]
      },
      {name: "罐头", count: 10, unit: '瓶'},
    ]))
  }
}
