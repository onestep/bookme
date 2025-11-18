export class ServiceGroupService {
    constructor($http) {
        this.$http = $http;
    }

    getServiceGroups() {
        return this.$http.get("/api/client/serviceGroups");
    }
}