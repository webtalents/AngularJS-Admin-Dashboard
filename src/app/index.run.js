(function ()
{
    'use strict';

    angular
        .module('fuse')
        .run(runBlock);

    /** @ngInject */
    function runBlock($rootScope, $state, $location, $timeout, AuthService)
    {
        // Activate loading indicator
        var stateChangeStartEvent = $rootScope.$on('$stateChangeStart', function (event, next, current)
        {
            //if($state.current() != '')
            //console.log(next);

            if(next.name != "app.auth_forgot-password" && next.name != "app.auth_login" && next.name != "app.auth_reset-password"){
                AuthService.getUserStatus()
                .then(function() {
                    if(!AuthService.isLoggedIn()) {
                        console.log('not logged in');
                        $location.path('/login');
                    }
                });
            }
            //console.log('run');
            //console.log('logged in');
            //$state.go('app.file-manager');
            $rootScope.loadingProgress = true;
        });

        // De-activate loading indicator
        var stateChangeSuccessEvent = $rootScope.$on('$stateChangeSuccess', function ()
        {
            $timeout(function ()
            {
                $rootScope.loadingProgress = false;
            });
        });

        // Store state in the root scope for easy access
        $rootScope.state = $state;

        // Cleanup
        $rootScope.$on('$destroy', function ()
        {
            stateChangeStartEvent();
            stateChangeSuccessEvent();
        });
    }
})();