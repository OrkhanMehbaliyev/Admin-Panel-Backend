const {
  HTTP_METHODS,
  RESPONSE_STATUS,
  CONTENT_TYPES,
} = require("../helpers/enums");
const { METHOD_NOT_ALLOWED_MESSAGE } = require("../helpers/messages");
const { PORTFOLIO_ENDPOINTS } = require("../helpers/urlHelper");
const { Work, Statistic, Portfolio } = require("../models/portfolioModel");
const portfolioService = require("../services/portfolio-service");
const parseRequestBody = require("../utils/request-parser");
const { ErrorResponse } = require("../utils/response");
const {
  generateResponse,
  ResponseConfig,
} = require("../utils/response-generator");

const getPortfolioData = async (req, res) => {
  const { method } = req;
  if (method === HTTP_METHODS.GET) {
    const response = await portfolioService.getPortfolioData();
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
            PORTFOLIO_ENDPOINTS.PORTFOLIO_GET_ENDPOINT
          )
        ),
        CONTENT_TYPES[".json"]
      )
    );
  }
};

const updatePortfolioData = async (req, res) => {
  const { method } = req;

  if (method === HTTP_METHODS.PUT || method === HTTP_METHODS.PATCH) {
    const body = await parseRequestBody(req);

    const works = body?.works?.map((work) => {
      return new Work(work?.type, work?.img, work?.heading);
    });
    const statistics = body?.statistics?.map((stat) => {
      return new Statistic(stat?.type, stat?.count);
    });
    const portfolioData = new Portfolio(works, statistics);

    const response = await portfolioService.updatePortfolioData(portfolioData);

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
            PORTFOLIO_ENDPOINTS.PORTFOLIO_UPDATE_ENDPOINT
          )
        ),
        CONTENT_TYPES[".json"]
      )
    );
  }
};

module.exports = {
  getPortfolioData,
  updatePortfolioData,
};
