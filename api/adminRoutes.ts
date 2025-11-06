import type {Application} from "express";
import * as serviceController from "./controllers/serviceController";

/**
 * @param {Application} app
 */
export function init(app: Application) {
    app.route("/api/admin/serviceGroups")
        .get(serviceController.readRootServiceGroups)
        .post(serviceController.addServiceGroup);
    app.route("/api/admin/serviceGroups/:groupId")
        .get(serviceController.readServiceGroups);
}