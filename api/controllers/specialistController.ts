import type {Request, Response} from "express";
import * as specialistDAO from "../../src/dao/specialistDAO";

import {HttpCode} from "../constants";

/**
 * @param {Request} req
 * @param {Response} res
 */
export function readSpecialists(req: Request, res: Response) {
    specialistDAO.getSpecialists()
        .then(specialists => {
            res.json(specialists);
        }, error => {
            res.sendStatus(HttpCode.INTERNAL_SERVER_ERROR);
        })
}