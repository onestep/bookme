"use strict";

var express = require("express"),
    clientRoutes = require("./api/clientRoutes"),
    app = express();

app.use(express.static(__dirname + "/public"));

clientRoutes.init(app);

app.listen(8080);