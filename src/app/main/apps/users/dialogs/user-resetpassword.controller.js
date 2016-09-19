(function ()
{
    'use strict';

    angular
        .module('app.users')
        .controller('UserResetPasswordController', UserResetPasswordController);

    /** @ngInject */
    function UserResetPasswordController($http, $scope, $rootScope, $mdDialog, GlobalVariable, contact)
    {
      // Data
      //console.log(contact);
      var vm = this;

      vm.hide = hide;
      vm.resetPassword = resetPassword;

      // Methods
      function hide() {
        $mdDialog.hide();
      }

      function resetPassword() {

        $http({
            method: 'POST',
            url: GlobalVariable.serverUrl + 'api/users/resetpassword',
            data: {
                password: vm.password,
                uid: contact._id
             }
        })
            // handle success
            .then(function success(response) {
                //$scope.properties = response.data;
                //console.log(response);
                /*$rootScope.errorUpdatePassword = true;
                $rootScope.errorUpdatePasswordMessage = response.data;*/
                //console.log($rootScope.errorUpdatePassword);
                $scope.error = true;
                $scope.errorMessage = response.data;
                //hide();
            },
            function error(response) {
                /*$scope.properties = {};*/
                console.log(response);
                $scope.error = true;
                $scope.errorMessage = "Failed";
            });
      }

    }
})();
