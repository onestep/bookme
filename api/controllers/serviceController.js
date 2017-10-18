"use strict";

var serviceDAO = require("../../src/dao/serviceDAO");

/**
 * @param {Object} req
 * @param {Object} res
 */
exports.readRootServiceGroups = function (req, res) {
    res.json(serviceDAO.getServiceGroups(null));
};

/**
 * @param {Object} req
 * @param {Object} res
 */
exports.readServiceGroups = function (req, res) {
    var groupId = parseInt(req.params["groupId"]),
        serviceGroups = serviceDAO.getServiceGroups(groupId);

    if (serviceGroups === null) {
        res.sendStatus(404);
    } else {
        res.json(serviceGroups);
    }
};

/**
 * @param {Object} req
 * @param {Object} res
 */
exports.readServices = function (req, res) {
    var groupId = parseInt(req.params["groupId"]),
        services = serviceDAO.getServices(groupId);

    if (services === null) {
        res.sendStatus(404);
    } else {
        res.json(services);
    }
};