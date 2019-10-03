const config = require("../config");
const connection = require("../connection/" + config.getApplicationOption("connection"));

/**
 * @param {string} name
 * @param {string} phone
 * @param {string} email
 * @return {Promise.<number>}
 */
exports.createCustomer = function (name, phone, email) {
    return connection.insert("insert into customers(customer_name, customer_phone, customer_email) values (?, ?, ?)", name, phone, email);
};
