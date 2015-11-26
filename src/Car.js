class Car {
  constructor(color) {
    this.color = color;
  }

  setColor(color) {
    this.color = color;
  }

  getColor(color) {
    return this.color;
  }

  static defaultCar() {
    return new Car('yellow');
  }
}

module.exports = Car;
