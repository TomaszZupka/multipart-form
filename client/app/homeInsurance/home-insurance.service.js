(function () {
    'use strict';

    angular.module('formApp.homeInsurance')
        .factory('HomeInsuranceService', HomeInsuranceService);

    HomeInsuranceService.$inject = ['Restangular', '$q'];
    function HomeInsuranceService(Restangular, $q) {
        return {
            saveUserForm: saveUserForm,
            getUserForm: getUserForm
        };

        //////////////////////////////////////////

        function saveUserForm(formData) {
            var requestData = mapUserClientToServer(formData),
                deferred = $q.defer();

            Restangular.all('user').post(requestData).then(function (user) {
                requestData = mapPropertyClientToServer(formData);
                Restangular.one('user', user._id).all('property').post(requestData).then(function (property) {
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
            var deferred = $q.defer(),
                user = Restangular.one("user", userId).get().then(function (user) {
                    user.all("property").getList().then(function (property) {
                        deferred.resolve(angular.extend({},
                            mapUserServerToClient(user),
                            mapPropertyServerToClient(property)));
                    }, function (error) {
                        deferred.reject(error);
                    });
                }, function (error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        }
    }

    function mapUserClientToServer(user) {
        return {
            first_name: user.firstName,
            last_name: user.lastName,
            date_of_birth: user.dateOfBirth,
            martial_status: user.martialStatus,
            email: user.email
        };
    }

    function mapUserServerToClient(user) {
        return {
            firstName: user.first_name,
            lastName: user.last_name,
            dateOfBirth: user.date_of_birth,
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
            smokers: property.smokers,
            long_term_unoccupied: property.longTermUnoccupied,
            short_term_unoccupied: property.shortTermUnoccupied
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
            smokers: property.smokers,
            longTermUnoccupied: property.long_term_unoccupied,
            shortTermUnoccupied: property.short_term_unoccupied
        };
    }
})();