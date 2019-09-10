const specialistDAO = require("../../src/dao/specialistDAO");

const {HttpCode} = require("../constants");

/**
 * @param {Request} req
 * @param {Response} res
 */
exports.readSpecialists = function (req, res) {
    specialistDAO.getSpecialists()
        .then(specialists => {
            res.json(specialists);
        }, error => {
            res.sendStatus(HttpCode.INTERNAL_SERVER_ERROR);
        })
};