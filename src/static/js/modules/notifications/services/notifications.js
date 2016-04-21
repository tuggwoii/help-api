'use strict';
module.factory('NotificationService', ['$rootScope', '$timeout', function ($rootScope, $timeout) {
    return {
        loading: function () {
            $rootScope.$broadcast('Loading');
        },
        stopLoading: function () {
            $rootScope.$broadcast('StopLoading');
            $rootScope.$broadcast('Ready');
        },
        openDialog: function (model, time) {
            if (!time) {
                time = 100;
            }
            $timeout(function () {
                $rootScope.$broadcast('OpenDialog', model);
            }, time);
        },
        openNotify: function (model) {
            $timeout(function () {
                $rootScope.$broadcast('OpenNotify', model);
            }, 500);
        }
    };
}]);
