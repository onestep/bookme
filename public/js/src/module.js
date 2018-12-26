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
    .service("serviceGroupService", ServiceGroupService)
    .controller("landingController", LandingController);