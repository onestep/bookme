const serviceController = require("./controllers/serviceController");
const specialistController = require("./controllers/specialistController");

/**
 * @param {Object} app
 */
exports.init = function (app) {
    app.route("/api/serviceGroups")
        .get(serviceController.readRootServiceGroups);
    app.route("/api/serviceGroups/:groupId")
        .get(serviceController.readServiceGroups);
    app.route("/api/services/:groupId")
        .get(serviceController.readServices);
    app.route("/api/specialists")
        .get(specialistController.readSpecialists);
};