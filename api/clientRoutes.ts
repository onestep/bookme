import type {Application} from "express";
import * as serviceController from "./controllers/serviceController";
import * as specialistController from "./controllers/specialistController";
import * as reservationController from "./controllers/reservationController";

/**
 * @param {Application} app
 */
export function init(app: Application) {
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
}