const {
  HTTP_METHODS,
  RESPONSE_STATUS,
  CONTENT_TYPES,
} = require("../helpers/enums");
const { METHOD_NOT_ALLOWED_MESSAGE } = require("../helpers/messages");
const { ABOUT_ENDPOINTS } = require("../helpers/urlHelper");
const About = require("../models/aboutModel");
const aboutService = require("../services/about-service");
const parseRequestBody = require("../utils/request-parser");
const { ErrorResponse } = require("../utils/response");
const {
  generateResponse,
  ResponseConfig,
} = require("../utils/response-generator");

const getAboutData = async (req, res) => {
  const { method } = req;
  if (method === "GET") {
    const response = await aboutService.getAboutData();

    response.success
      ? generateResponse(
          new ResponseConfig(
            RESPONSE_STATUS.OK,
            res,
            response,
            CONTENT_TYPES[".json"]
          )
        )
      : generateResponse(
          new ResponseConfig(
            RESPONSE_STATUS.BAD_REQUEST,
            res,
            response,
            CONTENT_TYPES[".json"]
          )
        );
  } else {
    generateResponse(
      new ResponseConfig(
        RESPONSE_STATUS.METHOD_NOT_ALLOWED,
        res,
        new ErrorResponse(
          METHOD_NOT_ALLOWED_MESSAGE(method, ABOUT_ENDPOINTS.ABOUT_GET_ENDPOINT)
        ),
        CONTENT_TYPES[".json"]
      )
    );
  }
};

const updateAboutData = async (req, res) => {
  const { method } = req;

  if (method === HTTP_METHODS.PUT || method === HTTP_METHODS.PATCH) {
    const body = await parseRequestBody(req);

    const data = new About(
      body?.welcomeMessage,
      body?.description,
      body?.name,
      body?.email,
      body?.phone,
      body?.twitter,
      body?.cv
    );

    const response = await aboutService.updateAboutData(data);

    response?.success
      ? generateResponse(
          new ResponseConfig(
            RESPONSE_STATUS.OK,
            res,
            response,
            CONTENT_TYPES[".json"]
          )
        )
      : generateResponse(
          new ResponseConfig(
            RESPONSE_STATUS.BAD_REQUEST,
            res,
            response,
            CONTENT_TYPES[".json"]
          )
        );
  } else {
    generateResponse(
      new ResponseConfig(
        RESPONSE_STATUS.METHOD_NOT_ALLOWED,
        res,
        new ErrorResponse(
          METHOD_NOT_ALLOWED_MESSAGE(
            method,
            ABOUT_ENDPOINTS.ABOUT_UPDATE_ENDPOINT
          )
        ),
        CONTENT_TYPES[".json"]
      )
    );
  }
};

module.exports = {
  getAboutData,
  updateAboutData,
};
