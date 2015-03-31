(function () {
    'use strict';

    var core = angular.module('formApp.core'),
        config = {
            appErrorPrefix: '[Liberty Demo Error] ', //Configure the exceptionHandler decorator
            appTitle: 'Liberty Demo',
            version: '1.0.0'
        };

    core
        .config(toastrConfig)
        .config(translateConfig)
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
})();
