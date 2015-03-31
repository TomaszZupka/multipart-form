/* global toastr:false */
(function() {
    'use strict';

    angular
        .module('formApp.core')
        .constant('toastr', toastr)
        .constant('_', _)
        .constant('restConfig', {
            url: 'http://localhost:1337/api/'
        });
})();
