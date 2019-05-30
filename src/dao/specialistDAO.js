const config = require("../config");
const connection = require("../connection/" + config.getApplicationOption("connection"));

function mapSpecialist(row) {
    return {
        id: row["specialist_id"],
        firstName: row["specialist_first_name"],
        lastName: row["specialist_last_name"],
        middleName: row["specialist_middle_name"]
    };
}

exports.getSpecialists = function () {
    return connection.selectAll("select * from specialists")
        .then((resultSet) => resultSet.map(mapSpecialist));
};