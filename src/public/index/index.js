import angular from "angular"
import angularRoute from "angular-route";
import {MixPanelInterceptorFactory} from "./mixPanelInterceptorFactory";
import {ServiceGroupService} from "./services/serviceGroupService";
import {SpecialistService} from "./services/specialistService";
import {LandingController} from "./controllers/landingController";

angular.module("bookmeApp", [angularRoute])
    .factory("mixPanelInterceptorFactory", MixPanelInterceptorFactory)
    .service("serviceGroupService", ['$http', ServiceGroupService])
    .service("specialistService", ['$http', SpecialistService])
    .controller("landingController", ['serviceGroupService', 'specialistService', LandingController])
    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push("mixPanelInterceptorFactory");
    }]);