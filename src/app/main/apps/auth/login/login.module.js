(function ()
{
    'use strict';

    angular
        .module('app.auth.login', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.auth_login', {
            url      : '/login',
            views    : {
                'main@'                       : {
                    templateUrl: 'app/core/layouts/content-only.html',
                    controller : 'MainController as vm',
                    resolve: {
											Portals: function (msApi) {
												return [];
											}
										}
                },
                'content@app.auth_login': {
                    templateUrl: 'app/main/apps/auth/login/login.html',
                    controller : 'LoginController as vm'
                }
            },
            bodyClass: 'login'
        });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/apps/auth/login');

        /*// Navigation
        msNavigationServiceProvider.saveItem('pages.auth', {
            title : 'Authentication',
            icon  : 'icon-lock',
            weight: 1
        });

        msNavigationServiceProvider.saveItem('pages.auth.login', {
            title : 'Login',
            state : 'app.pages_auth_login',
            weight: 1
        });*/
    }

})();