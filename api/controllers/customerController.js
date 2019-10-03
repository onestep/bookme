const customerDAO = require("../../src/dao/customerDAO");

/**
 * @param {Request} req
 * @param {Response} res
 */
exports.addCustomer = function (req, res) {
    const customer = req.body;

    customerDAO.createCustomer(
        customer["name"],
        customer["phone"],
        customer["email"]
    )
        .then(id => {
            res.status(HttpCode.CREATED).json({id});
        }, error => {
            res.sendStatus(HttpCode.INTERNAL_SERVER_ERROR);
        });
};
