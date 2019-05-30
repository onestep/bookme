const serviceDAO = require("../../src/dao/serviceDAO");

/**
 * @param {Object} req
 * @param {Object} res
 */
exports.readRootServiceGroups = function (req, res) {
    serviceDAO.getRootServiceGroups()
        .then((serviceGroups) => {
            res.json(serviceGroups);
        }, (error) => {
            res.sendStatus(500);
        });
};

/**
 * @param {Object} req
 * @param {Object} res
 */
exports.readServiceGroups = function (req, res) {
    const groupId = parseInt(req.params["groupId"]);

    serviceDAO.getServiceGroups(groupId)
        .then((serviceGroups) => {
            if (serviceGroups.length > 0) {
                res.json(serviceGroups);
            } else {
                res.sendStatus(404);
            }
        }, (error) => {
            res.sendStatus(500);
        });
};

/**
 * @param {Object} req
 * @param {Object} res
 */
exports.readServices = function (req, res) {
    const groupId = parseInt(req.params["groupId"]);

    serviceDAO.getServices(groupId)
        .then((services) => {
            if (services.length > 0) {
                res.json(services);
            } else {
                res.sendStatus(404);
            }
        });
};