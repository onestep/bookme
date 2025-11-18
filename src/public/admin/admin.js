import angular from "angular"
import angularRoute from "angular-route";
import {ServiceGroupService} from "./services/serviceGroupService";
import {ServiceManagementController} from "./services/serviceManagementController";

angular.module("adminApp", [angularRoute])
    .service("serviceGroupService", ['$http', ServiceGroupService])
    .controller("serviceManagementController", ['serviceGroupService', ServiceManagementController]);