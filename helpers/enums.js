const DATABASE_TABLE_KEYS = {
  home: "home",
  services: "services",
  about: "about",
  skills: "skills",
  portfolio: "portfolio",
  clients: "clients",
  contact: "contact",
};

const HTTP_METHODS = Object.freeze({
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
  OPTIONS: "OPTIONS",
});

const CONTENT_TYPES = Object.freeze({
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".json": "application/json",
  ".xml": "application/xml",
  ".txt": "text/plain",
  ".csv": "text/csv",
  ".pdf": "application/pdf",
  ".zip": "application/zip",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".mp3": "audio/mpeg",
  ".mp4": "video/mp4",
  ".mpeg": "video/mpeg",
  ".oga": "audio/ogg",
  ".ogv": "video/ogg",
  ".weba": "audio/webm",
  ".webm": "video/webm",
});

const HTTP_STATUS_CODES = Object.freeze({
  SUCCESS: {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
  },
  CLIENT_ERRORS: {
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
  },
  SERVER_ERRORS: {
    INTERNAL_SERVER: 500,
  },
});

const RESPONSE_STATUS = Object.freeze({
  OK: HTTP_STATUS_CODES.SUCCESS.OK,
  CREATED: HTTP_STATUS_CODES.SUCCESS.CREATED,
  NO_CONTENT: HTTP_STATUS_CODES.SUCCESS.NO_CONTENT,
  BAD_REQUEST: HTTP_STATUS_CODES.CLIENT_ERRORS.BAD_REQUEST,
  UNAUTHORIZED: HTTP_STATUS_CODES.CLIENT_ERRORS.UNAUTHORIZED,
  FORBIDDEN: HTTP_STATUS_CODES.CLIENT_ERRORS.FORBIDDEN,
  NOT_FOUND: HTTP_STATUS_CODES.CLIENT_ERRORS.NOT_FOUND,
  METHOD_NOT_ALLOWED: HTTP_STATUS_CODES.CLIENT_ERRORS.METHOD_NOT_ALLOWED,
  INTERNAL_SERVER: HTTP_STATUS_CODES.SERVER_ERRORS.INTERNAL_SERVER,
});

module.exports = {
  DATABASE_TABLE_KEYS,
  HTTP_METHODS,
  RESPONSE_STATUS,
  CONTENT_TYPES,
};
