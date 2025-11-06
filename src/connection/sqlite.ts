import sqlite3 from "sqlite3";
import path from "path";
import * as config from "../config";

const databaseFile = config.getConnectionOption("file");
const databaseFileRoot = databaseFile.startsWith(".") ? config.getConnectionConfigRoot() : config.getApplicationRoot();

const database = new sqlite3.Database(path.resolve(databaseFileRoot, databaseFile), function (error) {
    if (error) {
        throw error;
    }
});

/**
 * @param {string} query
 * @param {...*} params
 * @returns {Promise.<Array>}
 */
export function selectAll(query: string, ...params: any[]): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
        database.all(query, ...params, function (error, resultSet) {
            if (error) {
                console.error(error);
                reject(error);
            } else {
                resolve(resultSet);
            }
        });
    });
}

/**
 * @param {string} query
 * @param {...*} params
 * @returns {Promise}
 */
export function execute(query: string, ...params: any[]): Promise<any> {
    return new Promise<void>((resolve, reject) => {
        database.run(query, ...params, function (error) {
            if (error) {
                console.error(error);
                reject(error)
            } else {
                resolve();
            }
        })
    })
}