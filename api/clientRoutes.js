const serviceController = require("./controllers/serviceController");
const specialistController = require("./controllers/specialistController");

/**
 * @param {Object} app
 */
exports.init = function (app) {
    app.route("/api/client/serviceGroups")
        .get(serviceController.readRootServiceGroups);
    app.route("/api/client/serviceGroups/:groupId")
        .get(serviceController.readServiceGroups);
    app.route("/api/client/services/:groupId")
        .get(serviceController.readServices);
    app.route("/api/specialists")
        .get(specialistController.readSpecialists);
};