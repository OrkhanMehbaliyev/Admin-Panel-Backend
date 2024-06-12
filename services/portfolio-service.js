const { DATABASE_TABLE_KEYS } = require("../helpers/enums");
const {
  SUCCESS_GET_MESSAGE,
  SUCCESS_POST_MESSAGE,
  SUCCESS_UPDATE_MESSAGE,
  SUCCESS_DELETE_MESSAGE,
  OBJECT_NOT_FOUND,
  ERROR_POST_MESSAGE,
} = require("../helpers/messages");
const { Portfolio } = require("../models/portfolioModel");

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
const getPortfolioData = async () => {
  try {
    const data = await baseService.getData(DATABASE_TABLE_KEYS.portfolio);
    return new SuccessResponse(SUCCESS_GET_MESSAGE, data);
  } catch (error) {
    return new ErrorResponse("Error :" + error);
  }
};

/**
 *
 * @param {Portfolio} portfolioData
 * @returns {Response}
 */
const updatePortfolioData = async (portfolioData) => {
  try {
    const data = await baseService.updateObjectData(
      portfolioData,
      DATABASE_TABLE_KEYS.portfolio
    );
    return new SuccessResponse(SUCCESS_UPDATE_MESSAGE, data);
  } catch (error) {
    return new ErrorResponse("Error: " + error);
  }
};

module.exports = {
  getPortfolioData,
  updatePortfolioData,
};
