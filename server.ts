import express from "express";
import bodyParser from "body-parser";
import * as clientRoutes from "./api/clientRoutes";
import * as adminRoutes from "./api/adminRoutes";

const app = express();

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

clientRoutes.init(app);
adminRoutes.init(app);

app.listen(8080);