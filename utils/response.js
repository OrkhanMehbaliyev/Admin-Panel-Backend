class Response {
  constructor(success, message, data) {
    this.success = success;
    this.message = message;
    this.data = data;
  }
}

class SuccessResponse extends Response {
  constructor(message = "", data = null) {
    super(true, message, data);
  }
}

class ErrorResponse extends Response {
  constructor(message = "", data = null) {
    super(false, message, data);
  }
}

module.exports = {
  Response,
  SuccessResponse,
  ErrorResponse,
};
