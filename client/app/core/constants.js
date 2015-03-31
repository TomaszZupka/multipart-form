/* global toastr:false */
(function() {
    'use strict';

    angular
        .module('formApp.core')
        .constant('toastr', toastr)
        .constant('_', _);
})();
