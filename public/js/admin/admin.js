function ServiceGroupService($http) {
    this.$http = $http;
}

ServiceGroupService.prototype.getServiceGroups = function () {
    return this.$http.get("/api/admin/serviceGroups");
};

ServiceGroupService.prototype.addServiceGroup = function (serviceGroup) {
    return this.$http.post("/api/admin/serviceGroups", serviceGroup);
};

function ServiceManagementController(serviceGroupService) {
    this.serviceGroupService = serviceGroupService;

    this.newService = {};
    this.newServiceGroup = {};

    this.initServiceGroups();
}

ServiceManagementController.prototype.initServiceGroups = function () {
    this.serviceGroupService.getServiceGroups()
        .then(function (response) {
            this.serviceGroups = response.data;
        }.bind(this));
};

ServiceManagementController.prototype.addServiceGroup = function () {
    this.serviceGroupService.addServiceGroup(this.newServiceGroup);
};

ServiceManagementController.prototype.addService = function () {
    // TODO: implement
};

angular.module("adminApp", ["ngRoute"])
    .service("serviceGroupService", ServiceGroupService)
    .controller("serviceManagementController", ServiceManagementController);