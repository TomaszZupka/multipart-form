(function () {
    'use strict';

    angular
        .module('formApp.homeInsurance')
        .config(statesConfig);

    statesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function statesConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('form', {
                url: '/form',
                templateUrl: 'app/homeInsurance/form.html',
                controller: 'HomeInsuranceFormController as vm'
            })
            .state('form.user', {
                url: '/user',
                templateUrl: 'app/homeInsurance/form-user.html'
            })
            .state('form.propertyFirst', {
                url: '/propertyFirst',
                templateUrl: 'app/homeInsurance/form-property-first.html'
            })
            .state('form.propertySecond', {
                url: '/propertySecond',
                templateUrl: 'app/homeInsurance/form-property-second.html'
            })
            .state('summarize', {
                url: '/summarize/:userId',
                templateUrl: 'app/homeInsurance/summarize.html',
                controller: 'HomeInsuranceSummarizeController as vm'
            });

        $urlRouterProvider.otherwise('/form/user');
    }
})();