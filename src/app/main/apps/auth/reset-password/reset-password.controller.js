(function ()
{
    'use strict';

    angular
        .module('app.auth.reset-password')
        .controller('ResetPasswordController', ResetPasswordController);

    /** @ngInject */
    function ResetPasswordController($scope, $stateParams, AuthService)
    {
        // Data
        var token = $stateParams.token;
        //var password = $scope.vm.form.password;
        $scope.resetpassword = resetpassword;

        AuthService.reset_validate(token, function(response) {
            console.log(response);
            if(response.data.err) {
                $scope.error = true;
                $scope.errorMessage = response.data.err;
            }
            
        });
        
        // Methods
        function resetpassword() {
            AuthService.reset_password(token, $scope.vm.form.password, function(response) {
                console.log(response);
                if(response.data.err) {
                    $scope.error = true;
                    $scope.errorMessage = response.data.err;
                }
                if(response.data.status) {
                    $scope.error = true;
                    $scope.errorMessage = response.data.status;
                }
            });
        }

        //////////
    }
})();