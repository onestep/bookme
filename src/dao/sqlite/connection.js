const sqlite3 = require("sqlite3");
const path = require("path");

const database = new sqlite3.Database(path.resolve(__dirname, "../../../bookme.sqlite"), function (error) {
    if (error) {
        throw error;
    }
});

/**
 * @returns {Promise}
 */
exports.selectAll = function (query, ...params) {
    return new Promise((resolve, reject) => {
        database.all(query, ...params, function (error, resultSet) {
            if (error) {
                reject(error);
            } else {
                resolve(resultSet);
            }
        });
    });
};

/**
 * @returns {Promise}
 */
exports.execute = function (query, ...params) {
    return new Promise((resolve, reject) => {
        database.run(query, ...params, function (error) {
            if (error) {
                reject(error)
            } else {
                resolve();
            }
        })
    })
};