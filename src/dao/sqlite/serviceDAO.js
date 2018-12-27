const sqlite3 = require("sqlite3");
const path = require("path");

const database = new sqlite3.Database(path.resolve(__dirname, "../../../bookme.sqlite"), (error) => {
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
        database.all("select * from service_groups where parent_service_group_id is null", function (error, resultSet) {
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
        database.all("select * from service_groups where parent_service_group_id = ?", parentGroupId, function (error, resultSet) {
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
        database.all("select * from services where service_group_id = ?", groupId, function (error, resultSet) {
            if (error != null) {
                reject(error);
            } else {
                resolve(resultSet.map(mapService));
            }
        });
    });
};