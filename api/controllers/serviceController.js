const serviceDAO = require("../../src/dao/serviceDAO");

const {HttpCode} = require("../constants");

/**
 * @param {Request} req
 * @param {Response} res
 */
exports.readRootServiceGroups = function (req, res) {
    serviceDAO.getRootServiceGroups()
        .then(serviceGroups => {
            res.json(serviceGroups);
        }, error => {
            res.sendStatus(HttpCode.INTERNAL_SERVER_ERROR);
        });
};

/**
 * @param {Request} req
 * @param {Response} res
 */
exports.readServiceGroups = function (req, res) {
    const groupId = parseInt(req.params["groupId"]);

    serviceDAO.getServiceGroups(groupId)
        .then(serviceGroups => {
            if (serviceGroups.length > 0) {
                res.json(serviceGroups);
            } else {
                res.sendStatus(HttpCode.NOT_FOUND);
            }
        }, error => {
            res.sendStatus(HttpCode.INTERNAL_SERVER_ERROR);
        });
};

/**
 * @param {Request} req
 * @param {Response} res
 */
exports.addServiceGroup = function (req, res) {
    const serviceGroup = req.body;

    serviceDAO.addServiceGroup(
        serviceGroup["name"],
        serviceGroup["description"],
        serviceGroup["parentGroupId"]
    )
        .then(() => {
            res.sendStatus(HttpCode.CREATED);
        }, error => {
            res.sendStatus(HttpCode.INTERNAL_SERVER_ERROR);
        });
};

/**
 * @param {Request} req
 * @param {Response} res
 */
exports.readServices = function (req, res) {
    const groupId = parseInt(req.params["groupId"]);

    serviceDAO.getServices(groupId)
        .then(services => {
            if (services.length > 0) {
                res.json(services);
            } else {
                res.sendStatus(HttpCode.NOT_FOUND);
            }
        }, error => {
            res.sendStatus(HttpCode.INTERNAL_SERVER_ERROR);
        });
};