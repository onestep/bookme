"use strict";

var serviceDAO = require("../../src/dao/serviceDAO");

/**
 * @param {Object} req
 * @param {Object} res
 */
exports.readRootServiceGroups = function (req, res) {
    serviceDAO.getRootServiceGroups()
        .then(function (serviceGroups) {
            res.json(serviceGroups);
        });
};

/**
 * @param {Object} req
 * @param {Object} res
 */
exports.readServiceGroups = function (req, res) {
    var groupId = parseInt(req.params["groupId"]);

    serviceDAO.getServiceGroups(groupId)
        .then(function (serviceGroups) {
            if (serviceGroups.length > 0) {
                res.json(serviceGroups);
            } else {
                res.sendStatus(404);
            }
        });
};

/**
 * @param {Object} req
 * @param {Object} res
 */
exports.readServices = function (req, res) {
    var groupId = parseInt(req.params["groupId"]);

    serviceDAO.getServices(groupId)
        .then(function (services) {
            if (services.length > 0) {
                res.json(services);
            } else {
                res.sendStatus(404);
            }
        });
};