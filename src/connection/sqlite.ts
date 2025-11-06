const sqlite3 = require("sqlite3");
const path = require("path");
const config = require("../config");

const databaseFile = config.getConnectionOption("file");
const databaseFileRoot = databaseFile.startsWith(".") ? config.getConnectionConfigRoot() : config.getApplicationRoot();

const database = new sqlite3.Database(path.resolve(databaseFileRoot, databaseFile), function (error) {
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
        database.all(query, ...params, function (error, resultSet) {
            if (error) {
                console.error(error);
                reject(error);
            } else {
                resolve(resultSet);
            }
        });
    });
};

/**
 * @param {string} query
 * @param {...*} params
 * @returns {Promise}
 */
exports.execute = function (query, ...params) {
    return new Promise<void>((resolve, reject) => {
        database.run(query, ...params, function (error) {
            if (error) {
                console.error(error);
                reject(error)
            } else {
                resolve();
            }
        })
    })
};