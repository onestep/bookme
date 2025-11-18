export class SpecialistService {
    constructor($http) {
        this.$http = $http;
    }

    getSpecialists() {
        return this.$http.get("/api/specialists");
    }
}