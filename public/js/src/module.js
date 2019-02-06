mixpanel.init("de2c52c12dccdc9bc73a5949b888672b");

function MixPanelInterceptorFactory() {
    return {
        request: function (config) {
            mixpanel.track("Request started", {
                method: config.method,
                url: config.url
            });
            return config;
        },
        response: function (response) {
            mixpanel.track("Request finished", {
                method: response.config.method,
                url: response.config.url,
                status: response.status,
                statusText: response.statusText
            });
            return response;
        }
    }
}

function ServiceGroupService($http) {
    this.$http = $http;
}

ServiceGroupService.prototype.getServiceGroups = function () {
    return this.$http.get("/api/serviceGroups");
};

function SpecialistService($http) {
    this.$http = $http;
}

SpecialistService.prototype.getSpecialists = function () {
    return this.$http.get("/api/specialists");
};

function LandingController(serviceGroupService, specialistService) {
    this.serviceGroupService = serviceGroupService;
    this.specialistService = specialistService;
}

LandingController.prototype.selectService = function () {
    this.serviceGroupService.getServiceGroups().then(function (response) {
        this.serviceGroups = response.data;
    }.bind(this));
};

LandingController.prototype.selectSpecialist = function () {
    this.specialistService.getSpecialists().then(function (response) {
        this.specialists = response.data;
    }.bind(this));
};

angular.module("reserveApp", ["ngRoute"])
    .factory("mixPanelInterceptorFactory", MixPanelInterceptorFactory)
    .service("serviceGroupService", ServiceGroupService)
    .service("specialistService", SpecialistService)
    .controller("landingController", LandingController)
    .config(function ($httpProvider) {
        $httpProvider.interceptors.push("mixPanelInterceptorFactory");
    });