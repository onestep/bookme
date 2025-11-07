import * as config from "../config";
const connection = require("../connection/" + config.getApplicationOption("connection"));

/**
 * @param {number} serviceId
 * @param {number} specialistId
 * @param {Date} fromDateTime
 * @param {Date} toDateTime
 * @returns {Promise}
 */
export function addReservation(serviceId: number, specialistId: number, fromDateTime: Date, toDateTime: Date): Promise<void> {
    return connection.execute("insert into reservations(service_id, specialist_id, reservation_from_datetime, reservation_to_datetime) values (?, ?, ?, ?)", serviceId, specialistId, fromDateTime, toDateTime);
}