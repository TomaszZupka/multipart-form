(function() {
    'use strict';

    angular.module('formApp.core', [
        /*
         * Angular modules
         */
        'ngAnimate', 'ui.router', 'pascalprecht.translate', 'restangular', 'ngMessages',
        /*
         * Our reusable cross app code modules
         */
        'blocks.exception', 'blocks.logger'
    ]);
})();
