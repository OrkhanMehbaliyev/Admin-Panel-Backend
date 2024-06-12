class Portfolio {
  constructor(works = [], statistics = []) {
    this.works = works;
    this.statistics = statistics;
  }
}

class Work {
  constructor(type = "", img = "", heading = "") {
    this.type = type;
    this.img = img;
    this.heading = heading;
  }
}

class Statistic {
  constructor(type = "", count = 0) {
    this.type = type;
    this.count = count;
  }
}

module.exports = {
  Portfolio,
  Work,
  Statistic,
};
