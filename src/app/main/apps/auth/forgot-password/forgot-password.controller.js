(function ()
{
    'use strict';

    angular
        .module('app.auth.forgot-password')
        .controller('ForgotPasswordController', ForgotPasswordController);

    /** @ngInject */
    function ForgotPasswordController($scope, $location, AuthService)
    {
        // Data
        $scope.sendresetlink = sendresetlink;

        // Methods
        function sendresetlink() {
            //console.log('sendlink');
            AuthService.forgot($scope.vm.form.email, function(response) {
                /*if(response.err)
                $scope.error = true;
                $scope.errorMessage = "";*/
                console.log(response);
                if(response.data.err) {
                    $scope.error = true;
                    $scope.errorMessage = response.data.err;
                }
                else {
                    $location.path('/login');
                }
            });

        }
        

        //////////
    }
})();