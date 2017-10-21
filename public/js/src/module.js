"use strict";

angular.module("reserveApp", ["ngRoute"])

.controller("LandingController", function () {

    var landingController = this;

    landingController.loadServiceGroups = function () {
        console.log("TODO: LandingController.loadServiceGroups");
    };

    landingController.loadServices = function () {
        console.log("TODO: LandingController.loadServices");
    };
});