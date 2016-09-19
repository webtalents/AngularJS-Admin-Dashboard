(function ()
{
    'use strict';

    angular
        .module('app.contacts', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.contacts', {
            url      : '/contacts',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/apps/contacts/contacts.html',
                    controller : 'ContactsController as vm'
                }
            },
            resolve  : {
                Documents: function (msApi) {
                    // return msApi.resolve('app.contacts@get');
                }
            },
            bodyClass: 'contacts'
        });

        // msApiProvider.register('app.contacts', ['http://52.63.52.37:9000/api/contact', {}, {
        //     get: {method: 'get', isArray: true}
        // }]);

        // Navigation
        msNavigationServiceProvider.saveItem('contacts', {
            title : 'Contacts',
            icon  : 'icon-email',
            state : 'app.contacts',
            weight: 1
        });
    }

})();