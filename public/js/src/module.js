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

function LandingController(serviceGroupService) {
    this.serviceGroupService = serviceGroupService;
}

LandingController.prototype.selectService = function () {
    this.serviceGroupService.getServiceGroups().then(function (response) {
        this.serviceGroups = response.data;
    }.bind(this));
};

angular.module("reserveApp", ["ngRoute"])
    .factory("mixPanelInterceptorFactory", MixPanelInterceptorFactory)
    .service("serviceGroupService", ServiceGroupService)
    .controller("landingController", LandingController)
    .config(function ($httpProvider) {
        $httpProvider.interceptors.push("mixPanelInterceptorFactory");
    });