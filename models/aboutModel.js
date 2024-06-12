class About {
  constructor(
    welcomeMessage = "",
    description = "",
    name = "",
    email = "",
    phone = "",
    twitter = "",
    cv = ""
  ) {
    this.welcomeMessage = welcomeMessage;
    this.description = description;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.twitter = twitter;
    this.cv = cv;
  }
}

module.exports = About;
