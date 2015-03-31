(function () {
    'use strict';

    var core = angular.module('formApp.core'),
        config = {
            appErrorPrefix: '[Liberty Demo Error] ', //Configure the exceptionHandler decorator  // TODO - sprawdzic to!
            appTitle: 'Liberty Demo',
            version: '1.0.0'
        };

    core
        .config(toastrConfig)
        .config(translateConfig)
        .config(restangularConfig)
        .value('config', config);

    toastrConfig.$inject = ['toastr'];
    function toastrConfig(toastr) {
        toastr.options.timeOut = 4000;
        toastr.options.positionClass = 'toast-bottom-right';
    }

    translateConfig.$inject = ['$translateProvider'];
    function translateConfig($translateProvider) {
        $translateProvider.preferredLanguage('pl');
    }

    restangularConfig.$inject = ['RestangularProvider', 'restConfig', '$httpProvider'];
    function restangularConfig(RestangularProvider, restConfig, $httpProvider) {
        RestangularProvider.setBaseUrl(restConfig.url);

        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];

        RestangularProvider.setErrorInterceptor(function (response, deferred) {
            switch (response.status) {
                //case 401:
                default:
                    deferred.reject();
                    throw new Error('ERROR_SERVER_CONNECTION');
            }
        });
    }
})();
