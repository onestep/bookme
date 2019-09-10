const express = require("express");
const bodyParser = require("body-parser");
const clientRoutes = require("./api/clientRoutes");
const adminRoutes = require("./api/adminRoutes");

const app = express();

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

clientRoutes.init(app);
adminRoutes.init(app);

app.listen(8080);