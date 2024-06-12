class Home {
  constructor(welcomeMessage = "", abilities = [], socialAccounts = []) {
    this.welcomeMessage = welcomeMessage;
    this.abilities = abilities;
    this.socialAccounts = socialAccounts;
  }
}

class SocialAccount {
  constructor(platform = "", icon = "", url = "") {
    this.platform = platform;
    this.icon = icon;
    this.url = url;
  }
}

module.exports = {
  Home,
  SocialAccount,
};
