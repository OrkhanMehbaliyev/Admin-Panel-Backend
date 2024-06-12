const http = require("http");
const routeHandler = require("./routers/routes");
const corsMiddleware = require("./middlewares/cors-handler");
const generateResponse = require("./utils/response-generator");
const { ErrorResponse } = require("./utils/response");

const PORT = 3333;

const server = http.createServer((req, res) => {
  corsMiddleware(req, res, () => {
    handleDynamicRoutes(req, res);
  });
});

const handleDynamicRoutes = (req, res) => {
  if (!routeHandler(req, res)) {
    generateResponse({
      res: res,
      statusCode: 404,
      contentType: "application/json",
      data: new ErrorResponse("Not working"),
    });
  }
};

server.listen(PORT, () => {
  console.log("Server listens at " + PORT);
});
