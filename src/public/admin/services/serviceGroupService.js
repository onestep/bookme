export class ServiceGroupService {
    constructor($http) {
        this.$http = $http;
    }

    getServiceGroups() {
        return this.$http.get("/api/admin/serviceGroups");
    }

    addServiceGroup(serviceGroup) {
        return this.$http.post("/api/admin/serviceGroups", serviceGroup);
    }
}