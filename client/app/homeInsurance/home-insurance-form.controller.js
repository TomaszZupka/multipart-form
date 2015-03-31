(function () {
    'use strict';

    angular
        .module('formApp.homeInsurance')
        .controller('HomeInsuranceFormController', HomeInsuranceFormController);

    HomeInsuranceFormController.$inject = ['HomeInsuranceService', 'homeInsuranceOptions', '$filter', '$state', '_'];
    function HomeInsuranceFormController(HomeInsuranceService, homeInsuranceOptions, $filter, $state, _) {
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
            var messageTitle = $filter('translate')('FORM_SENDING_TITLE');
            HomeInsuranceService.saveUserForm(vm.fomrData).then(function (data) {
                toastr.success($filter('translate')('FORM_SENDING_SUCCESS', {msg: JSON.stringify(data)}), messageTitle);
                $state.go('summarize', {userId: data.userId});
            }, function (error) {
                toastr.error($filter('translate')('FORM_SENDING_ERROR', {msg: JSON.stringify(error)}), messageTitle);
            });
        }
    }
})();