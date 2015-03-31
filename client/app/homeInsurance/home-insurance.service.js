(function () {
    'use strict';

    angular.module('formApp.homeInsurance')
        .factory('HomeInsuranceService', HomeInsuranceService);

    HomeInsuranceService.$inject = ['Restangular', '$q', '$filter'];
    function HomeInsuranceService(Restangular, $q, $filter) {
        return {
            saveUserForm: saveUserForm,
            getUserForm: getUserForm
        };

        //////////////////////////////////////////

        function saveUserForm(formData) {
            var requestData = mapUserClientToServer(formData),
                deferred = $q.defer();

            Restangular.all('users').post(requestData).then(function (user) {
                requestData = mapPropertyClientToServer(formData);
                Restangular.one('users', user._id).all('properties').post(requestData).then(function (property) {
                    deferred.resolve({
                        userId: user._id,
                        propertyId: property._id
                    });
                }, function (error) {
                    deferred.reject(error);
                });
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        }

        function getUserForm(userId) {
            var deferred = $q.defer();
                Restangular.one("users", userId).get().then(function (user) {
                    Restangular.one("users", userId).all("properties").getList().then(function (property) {
                        deferred.resolve(angular.extend({},
                            mapUserServerToClient(user),
                            mapPropertyServerToClient(_.first(property))));
                    }, function (error) {
                        deferred.reject(error);
                    });
                }, function (error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        }

        function mapUserClientToServer(user) {
            return {
                first_name: user.firstName,
                last_name: user.lastName,
                date_of_birth: $filter('date')(user.dateOfBirth, 'yyyy-MM-dd'),
                martial_status: user.martialStatus,
                email: user.email
            };
        }

        function mapUserServerToClient(user) {
            return {
                firstName: user.first_name,
                lastName: user.last_name,
                dateOfBirth: $filter('date')(user.date_of_birth, 'yyyy-MM-dd'),
                martialStatus: user.martial_status,
                email: user.email
            };
        }

        function mapPropertyClientToServer(property) {
            return {
                property_type: property.propertyType,
                built_year: property.builtYear,
                bedrooms_num: property.bedroomsNum,
                bathrooms_num: property.bathroomsNum,
                ownership_type: property.ownershipType,
                adults_num: property.adultsNum,
                children_num: property.childrenNum,
                smokers: property.smokers || false,
                long_term_unoccupied: property.longTermUnoccupied || false,
                short_term_unoccupied: property.shortTermUnoccupied || false
            };
        }

        function mapPropertyServerToClient(property) {
            return {
                propertyType: property.property_type,
                builtYear: property.built_year,
                bedroomsNum: property.bedrooms_num,
                bathroomsNum: property.bathrooms_num,
                ownershipType: property.ownership_type,
                adultsNum: property.adults_num,
                childrenNum: property.children_num,
                smokers: property.smokers || false,
                longTermUnoccupied: property.long_term_unoccupied || false,
                shortTermUnoccupied: property.short_term_unoccupied || false
            };
        }
    }
})();