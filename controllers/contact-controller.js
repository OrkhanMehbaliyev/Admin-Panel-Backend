const {
  HTTP_METHODS,
  RESPONSE_STATUS,
  CONTENT_TYPES,
} = require("../helpers/enums");
const { METHOD_NOT_ALLOWED_MESSAGE } = require("../helpers/messages");
const { CONTACT_ENDPOINTS } = require("../helpers/urlHelper");
const { InfoCard, ContactDatas } = require("../models/contactModel");
const { SocialAccount } = require("../models/homeModel");
const contactService = require("../services/contact-service");
const parseRequestBody = require("../utils/request-parser");
const { ErrorResponse } = require("../utils/response");
const {
  generateResponse,
  ResponseConfig,
} = require("../utils/response-generator");

const getContactData = async (req, res) => {
  const { method } = req;
  if (method === "GET") {
    const response = await contactService.getContactData();

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
            CONTACT_ENDPOINTS.CONTACT_GET_ENDPOINT
          )
        ),
        CONTENT_TYPES[".json"]
      )
    );
  }
};

const updateContactData = async (req, res) => {
  const { method } = req;

  if (method === HTTP_METHODS.PUT || method === HTTP_METHODS.PATCH) {
    const body = await parseRequestBody(req);

    const infoCards = body?.infoCards?.map(
      (card) => new InfoCard(card?.type, card?.info, card?.icon)
    );

    const socials = body?.socials?.map(
      (acc) => new SocialAccount(acc?.platform, acc?.icon, acc?.url)
    );

    const contactData = new ContactDatas(infoCards, socials);
    const response = await contactService.updateContactData(contactData);

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
            CONTACT_ENDPOINTS.CONTACT_UPDATE_ENDPOINT
          )
        ),
        CONTENT_TYPES[".json"]
      )
    );
  }
};

module.exports = {
  getContactData,
  updateContactData,
};
