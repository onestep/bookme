import type {Request, Response} from "express";
import moment from "moment-timezone";
import * as reservationDAO from "../../src/dao/reservationDAO";
import * as serviceDAO from "../../src/dao/serviceDAO";

import {HttpCode} from "../constants";

/**
 * @param {Request} req
 * @param {Response} res
 */
export async function addReservation(req: Request, res: Response) {
    const reservation = req.body;

    try {
        const service = await serviceDAO.getService(reservation["serviceId"]);

        if (!service) {
            res.sendStatus(HttpCode.BAD_REQUEST);

            return;
        }

        const fromDateTime = moment.unix(reservation["fromDateTime"]);
        const toDateTime = fromDateTime.add(service.duration, "m");

        try {
            await reservationDAO.addReservation(
                reservation["serviceId"],
                reservation["specialistId"],
                fromDateTime.toDate(),
                toDateTime.toDate()
            );

            res.sendStatus(HttpCode.CREATED);
        } catch (error) {
            res.sendStatus(HttpCode.INTERNAL_SERVER_ERROR);
        }
    } catch (error) {
        res.sendStatus(HttpCode.INTERNAL_SERVER_ERROR);
    }
}