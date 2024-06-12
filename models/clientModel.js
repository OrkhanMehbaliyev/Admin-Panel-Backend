class Client {
  constructor(clientCommentsCards = [], companies = []) {
    this.clientCommentsCards = clientCommentsCards;
    this.companies = companies;
  }
}

class CommentCard {
  constructor(heading = "", img = "", name = "", companyName = "") {
    this.heading = heading;
    this.img = img;
    this.name = name;
    this.companyName = companyName;
  }
}

module.exports = {
  Client,
  CommentCard,
};
