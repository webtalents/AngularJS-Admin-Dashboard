(function ()
{
    'use strict';

    angular
        .module('app.auth.reset-password', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.auth_reset-password', {
            url      : '/reset-password/:token',
            views    : {
                'main@'                                : {
                    templateUrl: 'app/core/layouts/content-only.html',
                    controller : 'MainController as vm'
                },
                'content@app.auth_reset-password': {
                    templateUrl: 'app/main/apps/auth/reset-password/reset-password.html',
                    controller : 'ResetPasswordController as vm'
                }
            },
            bodyClass: 'reset-password'
        });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/apps/auth/reset-password');

/*        // Navigation
        msNavigationServiceProvider.saveItem('pages.auth.reset-password', {
            title : 'Reset Password',
            state : 'app.pages_auth_reset-password',
            weight: 6
        });*/
    }

})();