const urlHelper = require("../helpers/urlHelper");
const generateResponse = require("../utils/response-generator");

class Router {
  constructor() {
    this.routes = {};
  }

  addRoute(path, handler, isExtractId = false) {
    this.routes[path] = { handler, isExtractId };
  }

  async handleRoutes(req, res) {
    const { url } = req;
    let routeKey = this.getRouteKey(url);
    if (!routeKey) {
      return false;
    }

    const { handler, isExtractId } = this.routes[routeKey];
    const id = isExtractId ? this.extractIdFromUrl(url) : null;
    await handler(req, res, id);
    return true;
  }

  isParamPath(url) {
    const parts = url.split("/");
    return parts.some(
      (part) => this.isNumericParam(part) || this.isStringParam(part)
    );
  }

  isNumericParam(part) {
    return !isNaN(part);
  }

  isStringParam(part) {
    return isNaN(part) && part.length > 0;
  }

  getRouteKey(url) {
    const parts = url.split("/");
    for (const key of Object.keys(this.routes)) {
      const keyParts = key.split("/");
      if (parts.length === keyParts.length) {
        let isMatch = true;
        for (let i = 0; i < parts.length; i++) {
          if (keyParts[i].startsWith(":")) {
            continue;
          }
          if (parts[i] !== keyParts[i]) {
            isMatch = false;
            break;
          }
        }
        if (isMatch) {
          return key;
        }
      }
    }
    return null;
  }

  extractIdFromUrl(url) {
    const parts = url.split("/");
    const id = parts.pop();
    return this.isNumericParam(id) ? Number(id) : id;
  }
}

module.exports = Router;
