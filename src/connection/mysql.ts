const mysql = require("mysql");
const config = require("../config");

const connection = mysql.createConnection({
    host: config.getConnectionOption("host"),
    user: config.getConnectionOption("user"),
    password: config.getConnectionOption("password"),
    database: config.getConnectionOption("database")
});

connection.connect(function (error) {
    if (error) {
        throw error;
    }
});

/**
 * @param {string} query
 * @param {...*} params
 * @returns {Promise.<Array>}
 */
exports.selectAll = function (query, ...params) {
    return new Promise((resolve, reject) => {
        connection.query(query, ...params, function (error, resultSet) {
            if (error) {
                console.error(error);
                reject(error);
            } else {
                resolve(resultSet);
            }
        });
    });
};