(function () {
    'use strict';

    angular
        .module('formApp.homeInsurance')
        .controller('HomeInsuranceController', HomeInsuranceController);

    HomeInsuranceController.$inject = ['homeInsuranceOptions', '$filter', '_'];
    function HomeInsuranceController(homeInsuranceOptions, $filter, _) {
        var vm = this;

        vm.fomrData = {};
        vm.selectOptions = {};

        vm.processForm = processForm;

        activate();

        //////////////////////////////////////////

        function activate() {
            _.forIn(homeInsuranceOptions, function (value, key) {
                    vm.selectOptions[key] = _.map(value, function (element) {
                        return {
                            value: element,
                            label: $filter('translate')(element)
                        };
                    });
                }
            );
        }

        function processForm() {
            alert('awesome!');
        }
    }
})();