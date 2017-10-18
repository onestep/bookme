"use strict";

/**
 * @param {?number} parentGroupId
 * @returns {Array.<Object>}
 */
exports.getServiceGroups = function (parentGroupId) {
    if (parentGroupId === null) {
        return [
            {
                id: 1,
                name: "Group",
                description: "Group Description"
            }
        ];
    } else if (parentGroupId === 1) {
        return [
            {
                id: 2,
                name: "Sub Group",
                description: "Sub Group Description"
            }
        ]
    } else {
        return null;
    }
};

/**
 * @param {number} groupId
 * @returns {Array.<Object>}
 */
exports.getServices = function (groupId) {
    if (groupId === 1) {
        return [
            {
                id: 1,
                name: "Service",
                description: "Service Description"
            }
        ]
    } else {
        return null;
    }
};