const { DATABASE_TABLE_KEYS } = require("../helpers/enums");
const {
  SUCCESS_GET_MESSAGE,
  SUCCESS_UPDATE_MESSAGE,
} = require("../helpers/messages");
const { Home } = require("../models/homeModel");
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
const getHomeData = async () => {
  try {
    const data = await baseService.getData(DATABASE_TABLE_KEYS.home);
    return new SuccessResponse(SUCCESS_GET_MESSAGE, data);
  } catch (error) {
    return new ErrorResponse("Error :" + error);
  }
};

/**
 *
 * @param {Home} homeData
 * @returns {SuccessResponse}
 */
const updateHomeData = async (homeData) => {
  try {
    const data = await baseService.updateObjectData(
      homeData,
      DATABASE_TABLE_KEYS.home
    );
    return new SuccessResponse(SUCCESS_UPDATE_MESSAGE, data);
  } catch (error) {
    return new ErrorResponse("Error: " + error);
  }
};

module.exports = {
  getHomeData,
  updateHomeData,
};
