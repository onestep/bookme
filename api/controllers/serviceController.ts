import type {Request, Response} from "express";
import * as serviceDAO from "../../src/dao/serviceDAO";

import {HttpCode} from "../constants";

/**
 * @param {Request} req
 * @param {Response} res
 */
export function readRootServiceGroups(req: Request, res: Response) {
    serviceDAO.getRootServiceGroups()
        .then(serviceGroups => {
            res.json(serviceGroups);
        }, error => {
            res.sendStatus(HttpCode.INTERNAL_SERVER_ERROR);
        });
}

/**
 * @param {Request} req
 * @param {Response} res
 */
export function readServiceGroups(req: Request, res: Response) {
    const groupId = parseInt(req.params["groupId"]);

    serviceDAO.getServiceGroups(groupId)
        .then(serviceGroups => {
            if (serviceGroups.length > 0) {
                res.json(serviceGroups);
            } else {
                res.sendStatus(HttpCode.NOT_FOUND);
            }
        }, error => {
            res.sendStatus(HttpCode.INTERNAL_SERVER_ERROR);
        });
}

/**
 * @param {Request} req
 * @param {Response} res
 */
export function addServiceGroup(req: Request, res: Response) {
    const serviceGroup = req.body;

    serviceDAO.addServiceGroup(
        serviceGroup["name"],
        serviceGroup["description"],
        serviceGroup["parentGroupId"]
    )
        .then(() => {
            res.sendStatus(HttpCode.CREATED);
        }, error => {
            res.sendStatus(HttpCode.INTERNAL_SERVER_ERROR);
        });
}

/**
 * @param {Request} req
 * @param {Response} res
 */
export function readServices(req: Request, res: Response) {
    const groupId = parseInt(req.params["groupId"]);

    serviceDAO.getServices(groupId)
        .then(services => {
            if (services.length > 0) {
                res.json(services);
            } else {
                res.sendStatus(HttpCode.NOT_FOUND);
            }
        }, error => {
            res.sendStatus(HttpCode.INTERNAL_SERVER_ERROR);
        });
}