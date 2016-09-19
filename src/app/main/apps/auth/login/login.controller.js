(function ()
{
    'use strict';

    angular
        .module('app.auth.login')
        .controller('LoginController', LoginController);

    /** @ngInject */
    LoginController.$inject = ['$scope', '$location', 'AuthService', '$state']
    function LoginController($scope, $location, AuthService, $state)
    {
        $scope.login = function() {
            $scope.error = false;
            $scope.disabled = true;
            var remember_me = $scope.rememberme_checked ? true : false;
            //console.log(remember_me);
            AuthService.login($scope.vm.form.email, $scope.vm.form.password, remember_me )
                //handle success
                .then(function() {
                    AuthService.getUserStatus()
                    .then(function() {
                        if(!AuthService.isLoggedIn()) {
//                            console.log('not logged in');
                            $location.path('/login');
                            $scope.error = true;
                            $scope.errorMessage = "Invalid username and/or password";
                        }
                        else {
                            $location.path('/file-manager');
                        }
                    });
                    $scope.disabled = false;
                    //$scope.vm.form = {};
                })
                //handle error
                .catch(function() {
                    $scope.error = true;
                    $scope.errorMessage = "Invalid username and/or password";
                    $scope.disabled = false;
                    //$scope.vm.form = {};
                });
        };
    }
})();