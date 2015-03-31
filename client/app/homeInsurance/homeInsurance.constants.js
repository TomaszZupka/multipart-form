(function () {
    'use strict';

    angular
        .module('formApp.homeInsurance')
        .constant('homeInsuranceOptions', {
            MARTIAL_STATUS: ['SINGLE', 'MARRIED', 'DIVORCED', 'WIDOW'],
            PROPERTY_TYPE: ['HOUSE', 'FLAT'],
            OWNERSHIP_TYPE: ['OWN', 'RENT']
        });
})();