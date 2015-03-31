(function () {
    'use strict';

    angular
        .module('formApp.homeInsurance')
        .controller('HomeInsuranceSummarizeController', HomeInsuranceSummarizeController);

    HomeInsuranceSummarizeController.$inject = ['HomeInsuranceService', '$filter', '$stateParams'];
    function HomeInsuranceSummarizeController(HomeInsuranceService, $filter, $stateParams) {
        var vm = this;

        vm.fomrSummary = null;

        activate();

        //////////////////////////////////////////

        function activate() {
            var summaryMetaData = [
                {label: 'FIRST_NAME', field: 'firstName'},
                {label: 'LAST_NAME', field: 'lastName'},
                {label: 'DATE_OF_BIRTH', field: 'dateOfBirth'},
                {label: 'MARTIAL_STATUS', field: 'martialStatus'},
                {label: 'EMAIL', field: 'email'},
                {label: 'PROPERTY_TYPE', field: 'propertyType'},
                {label: 'BUILT_YEAR', field: 'builtYear'},
                {label: 'BEDROOMS_NUM', field: 'bedroomsNum'},
                {label: 'BATHROOMS_NUM', field: 'bathroomsNum'},
                {label: 'OWNERSHIP_TYPE', field: 'ownershipType'},
                {label: 'ADULTS_NUM', field: 'adultsNum'},
                {label: 'CHILDREN_NUM', field: 'childrenNum'},
                {label: 'SMOKERS', field: 'smokers', inverted: true},
                {label: 'LONG_TERM_UNOCCUPIED', field: 'longTermUnoccupied', inverted: true},
                {label: 'SHORT_TERM_UNOCCUPIED', field: 'shortTermUnoccupied', inverted: true}
            ];

            var messageTitle = $filter('translate')('FORM_RECEIVING_TITLE');
            HomeInsuranceService.getUserForm($stateParams.userId).then(function (summaryData) {
                vm.fomrSummary = {
                    data: summaryData,
                    metaData: summaryMetaData
                };
                toastr.success($filter('translate')('FORM_RECEIVING_SUCCESS'), messageTitle);
            }, function (error) {
                toastr.error($filter('translate')('FORM_RECEIVING_ERROR', {msg: JSON.stringify(error)}), messageTitle);
            });
        }
    }
})();