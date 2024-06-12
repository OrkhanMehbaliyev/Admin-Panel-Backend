const { HTTP_METHODS } = require("../helpers/enums");

const corsMiddleware = (req, res, next) => {
  // Log to verify middleware execution
  // Handling preflight request
  if (req.method === HTTP_METHODS.OPTIONS) {
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS,GET,HEAD,POST,PUT, DELETE",
      "Access-Control-Allow-Headers": "Content-Type",
    };
    res.writeHead(204, headers);
    res.end();
  } else {
    // Setting headers for other requests
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");

    next();
  }
};

module.exports = corsMiddleware;
