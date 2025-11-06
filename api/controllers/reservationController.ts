import type {Request, Response} from "express";
import moment from "moment-timezone";
import * as reservationDAO from "../../src/dao/reservationDAO";
import * as serviceDAO from "../../src/dao/serviceDAO";

import {HttpCode} from "../constants";

/**
 * @param {Request} req
 * @param {Response} res
 */
export function addReservation(req: Request, res: Response) {
    const reservation = req.body;

    const service = serviceDAO.getService(reservation["serviceId"])
        .then(service => {
            if (!service) {
                res.sendStatus(HttpCode.BAD_REQUEST);

                return;
            }

            const fromDateTime = moment.unix(reservation["fromDateTime"]);
            const toDateTime = fromDateTime.add(service.duration, "m");

            return reservationDAO.addReservation(
                reservation["serviceId"],
                reservation["specialistId"],
                fromDateTime.toDate(),
                toDateTime.toDate()
            )
                .then(() => {
                    res.sendStatus(HttpCode.CREATED)
                }, error => {
                    res.sendStatus(HttpCode.INTERNAL_SERVER_ERROR);
                });
        }, error => {
            res.sendStatus(HttpCode.INTERNAL_SERVER_ERROR);
        });
}