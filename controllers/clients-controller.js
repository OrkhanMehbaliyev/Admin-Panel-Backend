const {
  HTTP_METHODS,
  RESPONSE_STATUS,
  CONTENT_TYPES,
} = require("../helpers/enums");
const { METHOD_NOT_ALLOWED_MESSAGE } = require("../helpers/messages");
const { CLIENTS_ENDPOINTS } = require("../helpers/urlHelper");
const { CommentCard, Client } = require("../models/clientModel");
const clientsService = require("../services/clients-service");
const parseRequestBody = require("../utils/request-parser");
const { ErrorResponse } = require("../utils/response");
const {
  generateResponse,
  ResponseConfig,
} = require("../utils/response-generator");

const getClientsData = async (req, res) => {
  const { method } = req;
  if (method === "GET") {
    const response = await clientsService.getClientsData();

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
          METHOD_NOT_ALLOWED_MESSAGE(
            method,
            CLIENTS_ENDPOINTS.CLIENTS_GET_ENDPOINT
          )
        ),
        CONTENT_TYPES[".json"]
      )
    );
  }
};

const updateClientsData = async (req, res) => {
  const { method } = req;

  if (method === HTTP_METHODS.PUT || method === HTTP_METHODS.PATCH) {
    const body = await parseRequestBody(req);

    const commentCards = body?.clientCommentsCards?.map((card) => {
      return new CommentCard(
        card?.heading,
        card?.img,
        card?.name,
        card?.companyName
      );
    });

    const clientData = new Client(commentCards, body?.companies);

    const response = await clientsService.updateClientsData(clientData);

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
            CLIENTS_ENDPOINTS.CLIENTS_UPDATE_ENDPOINT
          )
        ),
        CONTENT_TYPES[".json"]
      )
    );
  }
};

module.exports = {
  getClientsData,
  updateClientsData,
};
