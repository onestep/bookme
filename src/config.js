const path = require("path");
const fs = require("fs");

const applicationRoot = path.resolve(__dirname, "..");
const applicationConfigRoot = path.resolve(applicationRoot, "config");
const connectionConfigRoot = path.resolve(applicationConfigRoot, "connection");
const applicationConfig = JSON.parse(fs.readFileSync(path.resolve(applicationConfigRoot, "application.json"), "utf-8"));
const connectionConfig = JSON.parse(fs.readFileSync(path.resolve(connectionConfigRoot, applicationConfig["connection"] + ".json"), "utf-8"));

exports.getApplicationRoot = function () {
    return applicationRoot;
};

exports.getApplicationConfigRoot = function () {
    return applicationConfigRoot;
};

exports.getConnectionConfigRoot = function () {
    return connectionConfigRoot;
};

exports.getApplicationOption = function (name) {
    return applicationConfig[name];
};

exports.getConnectionOption = function (name) {
    return connectionConfig[name];
};