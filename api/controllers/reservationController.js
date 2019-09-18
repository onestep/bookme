const moment = require("moment");
const reservationDAO = require("../../src/dao/reservationDAO");
const serviceDAO = require("../../src/dao/serviceDAO");

const {HttpCode} = require("../constants");

/**
 * @param {Request} req
 * @param {Response} res
 */
exports.addReservation = function (req, res) {
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
};