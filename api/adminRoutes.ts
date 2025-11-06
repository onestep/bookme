const serviceController = require("./controllers/serviceController");

/**
 * @param {Object} app
 */
exports.init = function (app) {
    app.route("/api/admin/serviceGroups")
        .get(serviceController.readRootServiceGroups)
        .post(serviceController.addServiceGroup);
    app.route("/api/admin/serviceGroups/:groupId")
        .get(serviceController.readServiceGroups);
};