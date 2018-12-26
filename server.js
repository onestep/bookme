const express = require("express");
const clientRoutes = require("./api/clientRoutes");

const app = express();

app.use(express.static(__dirname + "/public"));

clientRoutes.init(app);

app.listen(8080);