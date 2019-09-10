const config = require("../config");
const connection = require("../connection/" + config.getApplicationOption("connection"));

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
    return connection.selectAll("select * from service_groups where parent_service_group_id is null")
        .then(resultSet => resultSet.map(mapServiceGroup));
};

/**
 * @param {number} parentGroupId
 * @returns {Promise}
 */
exports.getServiceGroups = function (parentGroupId) {
    return connection.selectAll("select * from service_groups where parent_service_group_id = ?", parentGroupId)
        .then(resultSet => resultSet.map(mapServiceGroup));
};

/**
 * @param {string} name
 * @param {string} description
 * @param {?number=} parentGroupId
 * @returns {Promise}
 */
exports.addServiceGroup = function (name, description, parentGroupId = null) {
    return connection.execute("insert into service_groups(service_group_name, service_group_description, parent_service_group_id) values (?, ?, ?)", name, description, parentGroupId);
};

/**
 * @param {number} groupId
 * @returns {Promise}
 */
exports.getServices = function (groupId) {
    return connection.selectAll("select * from services where service_group_id = ?", groupId)
        .then(resultSet => resultSet.map(mapService));
};

/**
 * @param {string} name
 * @param {string} description
 * @param {number} groupId
 * @returns {Promise}
 */
exports.addService = function (name, description, groupId) {
    return connection.execute("insert into services(service_name, service_description, service_group_id) values (?, ?, ?)", name, description, groupId);
};