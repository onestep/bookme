export class LandingController {
    constructor(serviceGroupService, specialistService) {
        this.serviceGroupService = serviceGroupService;
        this.specialistService = specialistService;
    }

    selectService() {
        this.serviceGroupService.getServiceGroups().then(function (response) {
            this.serviceGroups = response.data;
        }.bind(this));
    }

    selectSpecialist() {
        this.specialistService.getSpecialists().then(function (response) {
            this.specialists = response.data;
        }.bind(this));
    }

    selectDateAndTime() {
        var currentDate = new Date();

        this.calendar = {
            weeks: this._generateWeeks(currentDate.getFullYear(), currentDate.getMonth())
        };
    }

    _generateWeeks(year, month) {
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
    }
}