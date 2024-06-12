const { DATABASE_TABLE_KEYS } = require("../helpers/enums");
const {
  SUCCESS_GET_MESSAGE,
  SUCCESS_POST_MESSAGE,
  SUCCESS_UPDATE_MESSAGE,
  SUCCESS_DELETE_MESSAGE,
  OBJECT_NOT_FOUND,
} = require("../helpers/messages");
const { Services } = require("../models/serviceModel");

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
const getServicesData = async () => {
  try {
    const data = await baseService.getData(DATABASE_TABLE_KEYS.services);
    return new SuccessResponse(SUCCESS_GET_MESSAGE, data);
  } catch (error) {
    return new ErrorResponse("Error :" + error);
  }
};

const postServicesData = async (servicesData) => {
  try {
    const data = await baseService.createModel(
      servicesData,
      DATABASE_TABLE_KEYS.services
    );
    return new SuccessResponse(SUCCESS_POST_MESSAGE, data);
  } catch (error) {
    return new ErrorResponse("Error " + error);
  }
};

/**
 *
 * @param {Services} servicesData
 * @returns {Response}
 */
const updateServicesData = async (servicesData, id) => {
  try {
    return (await baseService.updateArrayData(
      servicesData,
      DATABASE_TABLE_KEYS.services,
      id
    ))
      ? new SuccessResponse(SUCCESS_UPDATE_MESSAGE)
      : new ErrorResponse(OBJECT_NOT_FOUND);
  } catch (error) {
    return new ErrorResponse("Error: " + error);
  }
};

/**
 *
 * @param {Number} id
 * @returns {Response}
 */
const deleteServicesData = async (id) => {
  try {
    return (await baseService.deleteData(id, DATABASE_TABLE_KEYS.services))
      ? new SuccessResponse(SUCCESS_DELETE_MESSAGE)
      : new ErrorResponse(OBJECT_NOT_FOUND);
  } catch (error) {
    return new ErrorResponse("Error: " + error);
  }
};

module.exports = {
  getServicesData,
  postServicesData,
  updateServicesData,
  deleteServicesData,
};
