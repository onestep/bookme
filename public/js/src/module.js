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

LandingController.prototype.selectDateAndTime = function () {
    var currentDate = new Date();

    this.calendar = {
        weeks: this._generateWeeks(currentDate.getFullYear(), currentDate.getMonth())
    };
};

LandingController.prototype._generateWeeks = function (year, month) {
    var startDate = new Date(year, month);
    var endDate = new Date(year, month + 1, 0);
    var offset = startDate.getDay() - 1;

    var result = [];
    for (var i = 0; i < endDate.getDate(); i++) {
        var row = Math.trunc((i + offset) / 7);
        if (!result[row]) {
            result[row] = [{}, {}, {}, {}, {}, {}, {}];
        }
        result[row][(i + offset) % 7].date = i + 1;
    }

    return result;
};

angular.module("reserveApp", ["ngRoute"])
    .factory("mixPanelInterceptorFactory", MixPanelInterceptorFactory)
    .service("serviceGroupService", ServiceGroupService)
    .service("specialistService", SpecialistService)
    .controller("landingController", LandingController)
    .config(function ($httpProvider) {
        $httpProvider.interceptors.push("mixPanelInterceptorFactory");
    });