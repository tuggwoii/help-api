﻿'use strict';
module.controller('AppsController', ['$scope', '$timeout', 'AppService', 'NotificationService',
function ($scope, $timeout, AppService, NotificationService) {

    $scope.model = {};
    $scope.form = {};

    $scope.onLoad = function () {
        $scope.loadModel();
    };

    $scope.loadModel = function () {
        NotificationService.loading();
        AppService.getAll().success(function (res) {
            $scope.model = res.data;
		}).error(function () {
		    NotificationService.openDialog({
		        message: $scope.strings['cant_load_apps']
		    });
		}).finally(function () {
            NotificationService.stopLoading();
		});
    };

    $scope.deleteModel = function (id) {
        NotificationService.openDialog({
            type: 'confirm',
            callback: function () {
                NotificationService.loading();
                AppService.delete(id).success(function (res) {
                    var index = 0;
                    angular.forEach($scope.model, function (app) {
                        if (app.id === id) {
                            $scope.model.splice(index, 1);
                        }
                        else {
                            index++;
                        }
                    });
                }).error(function () {
                    NotificationService.openDialog({
                        message: $scope.strings['cant_delete_app']
                    });
                }).finally(function () {
                    NotificationService.stopLoading();
                });
            }
        }, 50);
    };

    $scope.openForm = function () {
        $scope.form = {};
        $scope.form.model = {};
        $scope.form.displayForm = true;
        $scope.form.animate = 'slideInRight';
    };

    $scope.onCreate = function (form) {
        if (form.$valid) {
            NotificationService.loading();
            AppService.create($scope.form.model).success(function () {
                NotificationService.openNotify({
                    title: $scope.strings['success'],
                    message: $scope.strings['create_app_success'],
                    type: 'success'
                });
                $scope.closeForm();
                $scope.loadModel();

            }).error(function () {
                NotificationService.openDialog({
                    message: $scope.strings['cant_create_app']
                });
            }).finally(function () {
                NotificationService.stopLoading();
            });
        }
        else {
            $scope.form.error = 'error';
        }
    };

    $scope.closeForm = function () {
        $scope.form.animate = 'slideOutRight';
        $timeout(function () {
            $scope.form.displayForm = false;
        }, 500);
    };

    $scope.onLoad();

}]);
