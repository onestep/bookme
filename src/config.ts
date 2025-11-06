import path from "path";
import fs from "fs";

const applicationRoot = path.resolve(__dirname, "..");
const applicationConfigRoot = path.resolve(applicationRoot, "config");
const connectionConfigRoot = path.resolve(applicationConfigRoot, "connection");
const applicationConfig = JSON.parse(fs.readFileSync(path.resolve(applicationConfigRoot, "application.json"), "utf-8"));
const connectionConfig = JSON.parse(fs.readFileSync(path.resolve(connectionConfigRoot, applicationConfig["connection"] + ".json"), "utf-8"));

export function getApplicationRoot() {
    return applicationRoot;
}

export function getApplicationConfigRoot() {
    return applicationConfigRoot;
}

export function getConnectionConfigRoot() {
    return connectionConfigRoot;
}

export function getApplicationOption(name) {
    return applicationConfig[name];
}

export function getConnectionOption(name) {
    return connectionConfig[name];
}