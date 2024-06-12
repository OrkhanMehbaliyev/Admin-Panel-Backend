class ContactDatas {
  constructor(infoCards = [], socials = []) {
    this.infoCards = infoCards;
    this.socials = socials;
  }
}

class ContactPost {
  constructor(name = "", subject = "", email = "", message = "") {
    this.name = name;
    this.subject = subject;
    this.email = email;
    this.message = message;
  }
}

class InfoCard {
  constructor(type = "", info = "", icon = "") {
    this.type = type;
    this.info = info;
    this.icon = icon;
  }
}

module.exports = {
  ContactDatas,
  ContactPost,
  InfoCard,
};
