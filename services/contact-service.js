const { DATABASE_TABLE_KEYS } = require("../helpers/enums");
const {
  SUCCESS_GET_MESSAGE,
  SUCCESS_POST_MESSAGE,
  SUCCESS_UPDATE_MESSAGE,
  SUCCESS_DELETE_MESSAGE,
  OBJECT_NOT_FOUND,
  ERROR_POST_MESSAGE,
} = require("../helpers/messages");
const { ContactDatas } = require("../models/contactModel");

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
const getContactData = async () => {
  try {
    const data = await baseService.getData(DATABASE_TABLE_KEYS.contact);
    return new SuccessResponse(SUCCESS_GET_MESSAGE, data);
  } catch (error) {
    return new ErrorResponse("Error :" + error);
  }
};

/**
 *
 * @param {ContactDatas} contactData
 * @returns {Response}
 */
const updateContactData = async (contactData) => {
  try {
    await baseService.updateObjectData(
      contactData,
      DATABASE_TABLE_KEYS.contact
    );
    return new SuccessResponse(SUCCESS_UPDATE_MESSAGE);
  } catch (error) {
    return new ErrorResponse("Error: " + error);
  }
};

module.exports = {
  getContactData,
  updateContactData,
};
