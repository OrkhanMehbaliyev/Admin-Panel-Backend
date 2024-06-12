const { DATABASE_TABLE_KEYS } = require("../helpers/enums");
const {
  SUCCESS_GET_MESSAGE,
  SUCCESS_UPDATE_MESSAGE,
} = require("../helpers/messages");
const About = require("../models/aboutModel");
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
const getAboutData = async () => {
  try {
    const data = await baseService.getData(DATABASE_TABLE_KEYS.about);
    return new SuccessResponse(SUCCESS_GET_MESSAGE, data);
  } catch (error) {
    return new ErrorResponse("Error :" + error);
  }
};

/**
 *
 * @param {About} aboutData
 * @returns {Response}
 */
const updateAboutData = async (aboutData) => {
  try {
    const data = await baseService.updateObjectData(
      aboutData,
      DATABASE_TABLE_KEYS.about
    );
    return new SuccessResponse(SUCCESS_UPDATE_MESSAGE, data);
  } catch (error) {
    return new ErrorResponse("Error: " + error);
  }
};

module.exports = {
  getAboutData,
  updateAboutData,
};
