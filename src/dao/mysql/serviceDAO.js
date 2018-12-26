const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    user: "bookme",
    password: "bookme",
    database: "bookme"
});

connection.connect((error) => {
    if (error) {
        throw error;
    }
});

function mapServiceGroup(row) {
    return {
        id: row["service_group_id"],
        name: row["service_group_name"],
        description: row["service_group_description"]
    };
}

function mapService(row) {
    return {
        id: row["service_id"],
        name: row["service_name"],
        description: row["service_description"]
    };
}

/**
 * @returns {Promise}
 */
exports.getRootServiceGroups = function () {
    return new Promise((resolve, reject) => {
        connection.query("select * from bookme.service_groups where parent_service_group_id is null", function (error, resultSet) {
            if (error != null) {
                reject(error);
            } else {
                resolve(resultSet.map(mapServiceGroup));
            }
        });
    });
};

/**
 * @param {?number} parentGroupId
 * @returns {Promise}
 */
exports.getServiceGroups = function (parentGroupId) {
    return new Promise((resolve, reject) => {
        connection.query("select * from bookme.service_groups where parent_service_group_id = ?", parentGroupId, function (error, resultSet) {
            if (error != null) {
                reject(error);
            } else {
                resolve(resultSet.map(mapServiceGroup));
            }
        });
    });
};

/**
 * @param {number} groupId
 * @returns {Promise}
 */
exports.getServices = function (groupId) {
    return new Promise((resolve, reject) => {
        connection.query("select * from bookme.services where service_group_id = ?", groupId, function (error, resultSet) {
            if (error != null) {
                reject(error);
            } else {
                resolve(resultSet.map(mapService));
            }
        });
    });
};