const {
  HOME_ENDPOINTS,
  SERVICES_ENDPOINTS,
  ABOUT_ENDPOINTS,
  SKILLS_ENDPOINTS,
  PORTFOLIO_ENDPOINTS,
  CLIENTS_ENDPOINTS,
  CONTACT_ENDPOINTS,
} = require("../helpers/urlHelper");

//Controllers
const homeController = require("../controllers/home-controller");
const servicesController = require("../controllers/services-controller");
const aboutController = require("../controllers/about-controller");
const skillsController = require("../controllers/skills-controller");
const portfolioController = require("../controllers/portfolio-controller");
const clientsController = require("../controllers/clients-controller");
const contactController = require("../controllers/contact-controller");

//router
const Router = require("./router");
const router = new Router();

//home
router.addRoute(HOME_ENDPOINTS.HOME_GET_ENDPOINT, homeController.getHomeData);
router.addRoute(
  HOME_ENDPOINTS.HOME_UPDATE_ENDPOINT,
  homeController.updateHomeData
);

//services
router.addRoute(
  SERVICES_ENDPOINTS.SERVICES_GET_ENDPOINT,
  servicesController.getServicesData
);
router.addRoute(
  SERVICES_ENDPOINTS.SERVICES_POST_ENDPOINT,
  servicesController.postServicesData
);
router.addRoute(
  SERVICES_ENDPOINTS.SERVICES_UPDATE_ENDPOINT,
  servicesController.updateServicesData,
  true
);
router.addRoute(
  SERVICES_ENDPOINTS.SERVICES_DELETE_ENDPOINT,
  servicesController.deleteServiceData,
  true
);

//about
router.addRoute(
  ABOUT_ENDPOINTS.ABOUT_GET_ENDPOINT,
  aboutController.getAboutData
);
router.addRoute(
  ABOUT_ENDPOINTS.ABOUT_UPDATE_ENDPOINT,
  aboutController.updateAboutData
);

//skills
router.addRoute(
  SKILLS_ENDPOINTS.SKILLS_GET_ENDPOINT,
  skillsController.getSkillsData
);
router.addRoute(
  SKILLS_ENDPOINTS.SKILLS_UPDATE_ENDPOINT,
  skillsController.updateSkillsData
);

//portfolio
router.addRoute(
  PORTFOLIO_ENDPOINTS.PORTFOLIO_GET_ENDPOINT,
  portfolioController.getPortfolioData
);

router.addRoute(
  PORTFOLIO_ENDPOINTS.PORTFOLIO_UPDATE_ENDPOINT,
  portfolioController.updatePortfolioData
);

//clients
router.addRoute(
  CLIENTS_ENDPOINTS.CLIENTS_GET_ENDPOINT,
  clientsController.getClientsData
);
router.addRoute(
  CLIENTS_ENDPOINTS.CLIENTS_UPDATE_ENDPOINT,
  clientsController.updateClientsData
);

//contact
router.addRoute(
  CONTACT_ENDPOINTS.CONTACT_GET_ENDPOINT,
  contactController.getContactData
);
router.addRoute(
  CONTACT_ENDPOINTS.CONTACT_UPDATE_ENDPOINT,
  contactController.updateContactData
);

module.exports = router.handleRoutes.bind(router);
