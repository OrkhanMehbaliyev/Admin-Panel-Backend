const {
  HTTP_METHODS,
  RESPONSE_STATUS,
  CONTENT_TYPES,
} = require("../helpers/enums");
const {
  SUCCESS_DELETE_MESSAGE,
  SUCCESS_GET_MESSAGE,
  METHOD_NOT_ALLOWED_MESSAGE,
} = require("../helpers/messages");
const { SERVICES_ENDPOINTS } = require("../helpers/urlHelper");
const { Services, ReadMoreData } = require("../models/serviceModel");
const servicesService = require("../services/services-service");
const parseRequestBody = require("../utils/request-parser");
const { SuccessResponse, ErrorResponse } = require("../utils/response");
const {
  generateResponse,
  ResponseConfig,
} = require("../utils/response-generator");

const getServicesData = async (req, res) => {
  const { method } = req;
  if (method === HTTP_METHODS.GET) {
    const response = await servicesService.getServicesData();
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
            SERVICES_ENDPOINTS.SERVICES_GET_ENDPOINT
          )
        ),
        CONTENT_TYPES[".json"]
      )
    );
  }
};

const postServicesData = async (req, res) => {
  const { method } = req;
  if (method === HTTP_METHODS.POST) {
    const body = await parseRequestBody(req);

    const servicesData = new Services(
      body?.title,
      body?.icon,
      body?.description
    );
    const response = await servicesService.postServicesData(servicesData);
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
            SERVICES_ENDPOINTS.SERVICES_POST_ENDPOINT
          )
        ),
        CONTENT_TYPES[".json"]
      )
    );
  }
};

const updateServicesData = async (req, res, id) => {
  const { method } = req;

  if (method === HTTP_METHODS.PUT || method === HTTP_METHODS.PATCH) {
    const body = await parseRequestBody(req);

    const data = new Services(body?.title, body?.icon, body?.description);
    const response = await servicesService.updateServicesData(data, id);

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
            SERVICES_ENDPOINTS.SERVICES_POST_ENDPOINT
          )
        ),
        CONTENT_TYPES[".json"]
      )
    );
  }
};

const deleteServiceData = async (req, res, id) => {
  const { method } = req;
  if (method === HTTP_METHODS.DELETE) {
    const response = await servicesService.deleteServicesData(id);

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
            SERVICES_ENDPOINTS.SERVICES_POST_ENDPOINT
          )
        ),
        CONTENT_TYPES[".json"]
      )
    );
  }
};

module.exports = {
  getServicesData,
  postServicesData,
  updateServicesData,
  deleteServiceData,
};
