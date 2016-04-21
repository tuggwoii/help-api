'use strict';
module.controller('DialogController', ['$scope', '$timeout', function ($scope, $timeout) {

    $scope.model = {};

    $scope.$on('OpenDialog', function (event, model) {
        $scope.model = model;
        if (!model) {
            $scope.model = {};
        }
        if (!$scope.model.title) {
            $scope.model.title = $scope.strings['error_header'];
        }
        if (!$scope.model.message) {
            $scope.model.message = $scope.strings['error_general'];
        }
        if (!$scope.model.type) {
            $scope.model.type = 'error';
        }
        $scope.model.isShow = true;
    });

    $scope.close = function () {
        $scope.model.isShow = false;
    };

    $scope.callback = function () {
        $scope.model.isShow = false;
        if ($scope.model.callback) {
            $scope.model.callback();
        }
    };

    $scope.reload = function () {
        window.location.reload();
    };

}]);
