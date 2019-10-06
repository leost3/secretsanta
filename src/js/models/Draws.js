export default class Draw {
  constructor(matches) {
    this.draws = matches;
    this.myDraw = [];
  }

  retrieveDrawsFromLocalStorage() {
    const storage = JSON.parse(localStorage.getItem('matches'));
    if (storage) this.draws = storage;
    return storage;
  }

  findDraw(name) {
    // console.log(this.draws);
    // this.retrieveDrawsFromLocalStorage('matches');
    const myDraw = this.draws.find(draw => draw.santa === name);
    this.myDraw = myDraw;
    return myDraw;
  }
}

// module.exports = draw;
