(function () {
    'use strict';

    angular
        .module('formApp.homeInsurance')
        .controller('HomeInsuranceFormController', HomeInsuranceFormController);

    HomeInsuranceFormController.$inject = ['HomeInsuranceService', 'homeInsuranceOptions', '$filter', '$state', '_'];
    function HomeInsuranceFormController(HomeInsuranceService, homeInsuranceOptions, $filter, $state, _) {
        var vm = this;

        vm.formData = {};
        vm.selectOptions = {};
        vm.form = null;
        vm.steps = null;

        vm.setForm = setForm;
        vm.processForm = processForm;
        vm.nextStep = nextStep;

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
            vm.steps = {
                'form.user': {
                    submitted: false,
                    nextStep: 'form.propertyFirst'
                },
                'form.propertyFirst': {
                    submitted: false,
                    nextStep: 'form.propertySecond'
                },
                'form.propertySecond': {
                    submitted: false
                }
            };
        }

        function setForm(form) {
            vm.form = form;
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

        function nextStep(currentStep) {
            submitStep(currentStep);
            if (vm.form.$valid) {
                $state.go(resolveNextStep(currentStep));
            }
        }

        function resolveNextStep(currentStep) {
            return vm.steps[currentStep].nextStep;
        }

        function submitStep(currentStep) {
            vm.steps[currentStep].submitted = true;
        }
    }
})();