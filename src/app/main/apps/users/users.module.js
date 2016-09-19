(function ()
{
    'use strict';

    angular
        .module('app.users', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {

        $stateProvider.state('app.users', {
            url    : '/users',
            views  : {
                'content@app': {
                    templateUrl: 'app/main/apps/users/users.html',
                    controller : 'UsersController as vm'
                }
            },
            resolve: {
                Users: function (msApi)
                {
                    return msApi.resolve('users.users@get');
                },
                User: function (msApi)
                {
                    return msApi.resolve('users.user@get');
                }
            }
        });

        // Api
        msApiProvider.register('users.users', ['http://52.63.52.37:9000/api/users', {}, {
          get: {
            method: 'get',
            isArray: true}
        }]);
/*

        msApiProvider.register('users.users', ['app/data/users/users.json']);
        */
        msApiProvider.register('users.user', ['app/data/users/user.json']);

        // Navigation
        msNavigationServiceProvider.saveItem('users', {
            title : 'Users',
            icon  : 'icon-account-box',
            state : 'app.users',
            weight: 1
        });

    }

})();