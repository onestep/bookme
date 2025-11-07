import type {Request, Response} from "express";
import * as serviceDAO from "../../src/dao/serviceDAO";

import {HttpCode} from "../constants";

/**
 * @param {Request} req
 * @param {Response} res
 */
export async function readRootServiceGroups(req: Request, res: Response) {
    try {
        const serviceGroups = await serviceDAO.getRootServiceGroups()

        res.json(serviceGroups);
    } catch (error) {
        res.sendStatus(HttpCode.INTERNAL_SERVER_ERROR);
    }
}

/**
 * @param {Request} req
 * @param {Response} res
 */
export async function readServiceGroups(req: Request, res: Response) {
    const groupId = parseInt(req.params["groupId"]);

    try {
        const serviceGroups = await serviceDAO.getServiceGroups(groupId);

        if (serviceGroups.length > 0) {
            res.json(serviceGroups);
        } else {
            res.sendStatus(HttpCode.NOT_FOUND);
        }
    } catch (error) {
        res.sendStatus(HttpCode.INTERNAL_SERVER_ERROR);
    }
}

/**
 * @param {Request} req
 * @param {Response} res
 */
export async function addServiceGroup(req: Request, res: Response) {
    const serviceGroup = req.body;

    try {
        await serviceDAO.addServiceGroup(
            serviceGroup["name"],
            serviceGroup["description"],
            serviceGroup["parentGroupId"]
        );

        res.sendStatus(HttpCode.CREATED);
    } catch (error) {
        res.sendStatus(HttpCode.INTERNAL_SERVER_ERROR);
    }
}

/**
 * @param {Request} req
 * @param {Response} res
 */
export async function readServices(req: Request, res: Response) {
    const groupId = parseInt(req.params["groupId"]);

    try {
        const services = await serviceDAO.getServices(groupId);

        if (services.length > 0) {
            res.json(services);
        } else {
            res.sendStatus(HttpCode.NOT_FOUND);
        }
    } catch (error) {
        res.sendStatus(HttpCode.INTERNAL_SERVER_ERROR);
    }
}