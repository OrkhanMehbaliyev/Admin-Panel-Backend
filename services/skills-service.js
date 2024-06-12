const { DATABASE_TABLE_KEYS } = require("../helpers/enums");
const {
  SUCCESS_GET_MESSAGE,
  SUCCESS_UPDATE_MESSAGE,
} = require("../helpers/messages");
const MySkills = require("../models/mySkillsModel");
const {
  SuccessResponse,
  Response,
  ErrorResponse,
} = require("../utils/response");
const baseService = require("./base-service");

/**
 *
 * @returns {Response}
 */
const getSkillsData = async () => {
  try {
    const data = await baseService.getData(DATABASE_TABLE_KEYS.skills);
    return new SuccessResponse(SUCCESS_GET_MESSAGE, data);
  } catch (error) {
    return new ErrorResponse("Error :" + error);
  }
};

/**
 *
 * @param {MySkills} skillData
 * @returns {Response}
 */
const updateSkillsData = async (skillData) => {
  try {
    const data = await baseService.updateObjectData(
      skillData,
      DATABASE_TABLE_KEYS.skills
    );
    return new SuccessResponse(SUCCESS_UPDATE_MESSAGE, data);
  } catch (error) {
    return new ErrorResponse("Error: " + error);
  }
};

module.exports = {
  getSkillsData,
  updateSkillsData,
};
