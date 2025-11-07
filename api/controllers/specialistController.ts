import type {Request, Response} from "express";
import * as specialistDAO from "../../src/dao/specialistDAO";

import {HttpCode} from "../constants";

/**
 * @param {Request} req
 * @param {Response} res
 */
export async function readSpecialists(req: Request, res: Response) {
    try {
        const specialists = await specialistDAO.getSpecialists();

        res.json(specialists);
    } catch (error) {
        res.sendStatus(HttpCode.INTERNAL_SERVER_ERROR);
    }
}