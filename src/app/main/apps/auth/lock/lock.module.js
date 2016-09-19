(function ()
{
    'use strict';

    angular
        .module('app.pages.auth.lock', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.pages_auth_lock', {
            url      : '/pages/auth/lock',
            views    : {
                'main@'                      : {
                    templateUrl: 'app/core/layouts/content-only.html',
                    controller : 'MainController as vm'
                },
                'content@app.pages_auth_lock': {
                    templateUrl: 'app/main/pages/auth/lock/lock.html',
                    controller : 'LockController as vm'
                }
            },
            bodyClass: 'lock'
        });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/pages/auth/lock');

        // Navigation
        msNavigationServiceProvider.saveItem('pages.auth.lock', {
            title : 'Lock Screen',
            state : 'app.pages_auth_lock',
            weight: 7
        });
    }

})();