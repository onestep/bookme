const config = require("../config");
const connection = require("../connection/" + config.getApplicationOption("connection"));

/**
 * @typedef {Object} ServiceGroup
 * @property {number} id
 * @property {string} name
 * @property {string} description
 */

/**
 * @param row
 * @returns {ServiceGroup}
 */
function mapServiceGroup(row) {
    return {
        id: row["service_group_id"],
        name: row["service_group_name"],
        description: row["service_group_description"]
    };
}

/**
 * @typedef {Object} Service
 * @property {number} id
 * @property {string} name
 * @property {string} description
 * @property {number} duration
 */

/**
 * @param row
 * @returns {Service}
 */
function mapService(row) {
    return {
        id: row["service_id"],
        name: row["service_name"],
        description: row["service_description"],
        duration: row["service_duration"]
    };
}

/**
 * @returns {Promise<Array<ServiceGroup>>}
 */
exports.getRootServiceGroups = function () {
    return connection.selectAll("select * from service_groups where parent_service_group_id is null")
        .then(resultSet => resultSet.map(mapServiceGroup));
};

/**
 * @param {number} parentGroupId
 * @returns {Promise<Array<ServiceGroup>>}
 */
exports.getServiceGroups = function (parentGroupId) {
    return connection.selectAll("select * from service_groups where parent_service_group_id = ?", parentGroupId)
        .then(resultSet => resultSet.map(mapServiceGroup));
};

/**
 * @param {string} name
 * @param {string} description
 * @param {?number=} parentGroupId
 * @returns {Promise.<number>}
 */
exports.addServiceGroup = function (name, description, parentGroupId = null) {
    return connection.insert("insert into service_groups(service_group_name, service_group_description, parent_service_group_id) values (?, ?, ?)", name, description, parentGroupId);
};

/**
 * @param {number} groupId
 * @returns {Promise<Array<Service>>}
 */
exports.getServices = function (groupId) {
    return connection.selectAll("select * from services where service_group_id = ?", groupId)
        .then(resultSet => resultSet.map(mapService));
};

/**
 * @param {number} serviceId
 * @returns {Promise<Service | undefined>}
 */
exports.getService = function (serviceId) {
    return connection.selectAll("select * from services where service_id = ?", serviceId)
        .then(resultSet => resultSet.map(mapService).find(service => service.id === serviceId));
};

/**
 * @param {string} name
 * @param {string} description
 * @param {number} groupId
 * @returns {Promise.<number>}
 */
exports.addService = function (name, description, groupId) {
    return connection.insert("insert into services(service_name, service_description, service_group_id) values (?, ?, ?)", name, description, groupId);
};