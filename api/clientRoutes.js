const serviceController = require("./controllers/serviceController");
const specialistController = require("./controllers/specialistController");
const customerController = require("./controllers/customerController");
const reservationController = require("./controllers/reservationController");

/**
 * @param {Application} app
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
    app.route("/api/reservations")
        .post(reservationController.addReservation);
    app.route("/api/customers")
        .post(customerController.addCustomer);
};