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
                controller: 'HomeInsuranceController as vm'

            })
            .state('form.user', {
                url: '/user',
                templateUrl: 'app/homeInsurance/formUser.html'
            })
            .state('form.propertyFirst', {
                url: '/propertyFirst',
                templateUrl: 'app/homeInsurance/formPropertyFirst.html'
            })
            .state('form.propertySecond', {
                url: '/propertySecond',
                templateUrl: 'app/homeInsurance/formPropertySecond.html'
            });

        $urlRouterProvider.otherwise('/form/user');
    }
})();