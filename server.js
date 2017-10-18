"use strict";

var express = require("express"),
    clientRoutes = require("./api/clientRoutes"),
    app = express();

clientRoutes.init(app);

app.listen(8080);