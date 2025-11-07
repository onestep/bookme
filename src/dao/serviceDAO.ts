import * as config from "../config";
const connection = require("../connection/" + config.getApplicationOption("connection"));

interface ServiceGroup {
    id: number;
    name: string;
    description: string;
}

/**
 * @param row
 * @returns {ServiceGroup}
 */
function mapServiceGroup(row): ServiceGroup {
    return {
        id: row["service_group_id"],
        name: row["service_group_name"],
        description: row["service_group_description"]
    };
}

interface Service {
    id: number;
    name: string;
    description: string;
    duration: number;
}

/**
 * @param row
 * @returns {Service}
 */
function mapService(row): Service {
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
export function getRootServiceGroups(): Promise<Array<ServiceGroup>> {
    return connection.selectAll("select * from service_groups where parent_service_group_id is null")
        .then(resultSet => resultSet.map(mapServiceGroup));
}

/**
 * @param {number} parentGroupId
 * @returns {Promise<Array<ServiceGroup>>}
 */
export function getServiceGroups(parentGroupId: number): Promise<Array<ServiceGroup>> {
    return connection.selectAll("select * from service_groups where parent_service_group_id = ?", parentGroupId)
        .then(resultSet => resultSet.map(mapServiceGroup));
}

/**
 * @param {string} name
 * @param {string} description
 * @param {?number=} parentGroupId
 * @returns {Promise}
 */
export function addServiceGroup(name: string, description: string, parentGroupId: (number | null) | undefined = null): Promise<void> {
    return connection.execute("insert into service_groups(service_group_name, service_group_description, parent_service_group_id) values (?, ?, ?)", name, description, parentGroupId);
}

/**
 * @param {number} groupId
 * @returns {Promise<Array<Service>>}
 */
export function getServices(groupId: number): Promise<Array<Service>> {
    return connection.selectAll("select * from services where service_group_id = ?", groupId)
        .then(resultSet => resultSet.map(mapService));
}

/**
 * @param {number} serviceId
 * @returns {Promise<Service | undefined>}
 */
export function getService(serviceId: number): Promise<Service | undefined> {
    return connection.selectAll("select * from services where service_id = ?", serviceId)
        .then(resultSet => resultSet.map(mapService).find(service => service.id === serviceId));
}

/**
 * @param {string} name
 * @param {string} description
 * @param {number} groupId
 * @returns {Promise}
 */
export function addService(name: string, description: string, groupId: number): Promise<void> {
    return connection.execute("insert into services(service_name, service_description, service_group_id) values (?, ?, ?)", name, description, groupId);
}