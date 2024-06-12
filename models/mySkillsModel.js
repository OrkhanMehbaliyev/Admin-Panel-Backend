class MySkills {
  constructor(heading = "", description = "", skills = []) {
    this.heading = heading;
    this.description = description;
    this.skills = skills;
  }
}

class Skill {
  constructor(skillName = "", percentage = "") {
    this.skillName = skillName;
    this.percentage = percentage;
  }
}

module.exports = {
  MySkills,
  Skill,
};
