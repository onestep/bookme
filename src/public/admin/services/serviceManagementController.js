export class ServiceManagementController {
    constructor(serviceGroupService) {
        this.serviceGroupService = serviceGroupService;

        this.newService = {};
        this.newServiceGroup = {};

        this.initServiceGroups();
    }

    initServiceGroups() {
        this.serviceGroupService.getServiceGroups()
            .then(function (response) {
                this.serviceGroups = response.data;
            }.bind(this));
    }

    addServiceGroup() {
        this.serviceGroupService.addServiceGroup(this.newServiceGroup);
    }

    addService() {
        // TODO: implement
    }
}