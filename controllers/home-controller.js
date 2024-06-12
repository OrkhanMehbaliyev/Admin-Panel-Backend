const {
  HTTP_METHODS,
  RESPONSE_STATUS,
  CONTENT_TYPES,
} = require("../helpers/enums");
const { METHOD_NOT_ALLOWED_MESSAGE } = require("../helpers/messages");
const { HOME_ENDPOINTS } = require("../helpers/urlHelper");
const { Home, SocialAccount } = require("../models/homeModel");
const homeService = require("../services/home-service");
const parseRequestBody = require("../utils/request-parser");
const { ErrorResponse } = require("../utils/response");
const {
  generateResponse,
  ResponseConfig,
} = require("../utils/response-generator");

const getHomeData = async (req, res) => {
  const { method } = req;
  if (method === "GET") {
    const response = await homeService.getHomeData();

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
          METHOD_NOT_ALLOWED_MESSAGE(method, HOME_ENDPOINTS.HOME_GET_ENDPOINT)
        ),
        CONTENT_TYPES[".json"]
      )
    );
  }
};

const updateHomeData = async (req, res) => {
  const { method } = req;

  if (method === HTTP_METHODS.PUT || method === HTTP_METHODS.PATCH) {
    const body = await parseRequestBody(req);

    const socialAccounts = body?.socialAccounts?.map((acc) => {
      return new SocialAccount(acc?.platform, acc?.icon, acc?.url);
    });

    const homeData = new Home(
      body?.welcomeMessage,
      body?.abilities,
      socialAccounts
    );

    const response = await homeService.updateHomeData(homeData);

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
            HOME_ENDPOINTS.HOME_UPDATE_ENDPOINT
          )
        ),
        CONTENT_TYPES[".json"]
      )
    );
  }
};

module.exports = {
  getHomeData,
  updateHomeData,
};
