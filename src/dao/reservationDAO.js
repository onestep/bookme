const config = require("../config");
const connection = require("../connection/" + config.getApplicationOption("connection"));

/**
 * @param {number} serviceId
 * @param {number} specialistId
 * @param {number} customerId
 * @param {Date} fromDateTime
 * @param {Date} toDateTime
 * @returns {Promise.<number>}
 */
exports.addReservation = function (serviceId, specialistId, customerId, fromDateTime, toDateTime) {
    return connection.insert("insert into reservations(service_id, specialist_id, customer_id, reservation_from_datetime, reservation_to_datetime) values (?, ?, ?, ?, ?)", serviceId, specialistId, customerId, fromDateTime, toDateTime);
};