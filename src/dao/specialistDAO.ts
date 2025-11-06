import * as config from "../config";
const connection = require("../connection/" + config.getApplicationOption("connection"));

interface Specialist {
    id: number;
    firstName: string;
    lastName: string;
    middleName: string;
}

function mapSpecialist(row): Specialist {
    return {
        id: row["specialist_id"],
        firstName: row["specialist_first_name"],
        lastName: row["specialist_last_name"],
        middleName: row["specialist_middle_name"]
    };
}

export function getSpecialists(): Promise<Array<Specialist>> {
    return connection.selectAll("select * from specialists")
        .then((resultSet) => resultSet.map(mapSpecialist));
}