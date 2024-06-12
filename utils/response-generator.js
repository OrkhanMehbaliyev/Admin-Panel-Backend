const { CONTENT_TYPES } = require("../helpers/enums");

class ResponseConfig {
  constructor(status, response, data, contentType) {
    this.status = status;
    this.response = response;
    this.data = data;
    this.contentType = contentType;
  }
}

/**
 *
 * @param {ResponseConfig} config
 */
const generateResponse = (config) => {
  config.response.writeHead(
    config.status,
    (config.contentType = CONTENT_TYPES[".json"])
  );
  config.response.end(JSON.stringify(config.data, null, 2));
};

module.exports = {
  ResponseConfig,
  generateResponse,
};

module.exports = {
  generateResponse,
  ResponseConfig,
};
