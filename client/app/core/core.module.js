(function() {
    'use strict';

    angular.module('formApp.core', [
        /*
         * Angular modules
         */
        'ngAnimate', 'ui.router', 'pascalprecht.translate',
        /*
         * Our reusable cross app code modules
         */
        'blocks.exception', 'blocks.logger'
    ]);
})();
