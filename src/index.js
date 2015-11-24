var foo = 1;
let bar = 1;

var baz = [1,2,3].filter(v => v > 2);

var obj = {
  name: "tom",
  friends: ["bob", "jerry"],
  printFriends: function() {
    this.friends.forEach(f => {
      console.log(this.name + 'knows' + f);
    })
  }
}
