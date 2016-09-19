(function ()
{
    'use strict';

    angular
        .module('fuse')
        .factory('api', apiService);

    /** @ngInject */
    function apiService($resource)
    {
        /**
         * You can use this service to define your API urls. The "api" service
         * is designed to work in parallel with "apiResolver" service which you can
         * find in the "app/core/services/api-resolver.service.js" file.
         *
         * You can structure your API urls whatever the way you want to structure them.
         * You can either use very simple definitions, or you can use multi-dimensional
         * objects.
         *
         * Here's a very simple API url definition example:
         *
         *      api.getBlogList = $resource('http://api.example.com/getBlogList');
         *
         * While this is a perfectly valid $resource definition, most of the time you will
         * find yourself in a more complex situation where you want url parameters:
         *
         *      api.getBlogById = $resource('http://api.example.com/blog/:id', {id: '@id'});
         *
         * You can also define your custom methods. Custom method definitions allow you to
         * add hardcoded parameters to your API calls that you want to sent every time you
         * make that API call:
         *
         *      api.getBlogById = $resource('http://api.example.com/blog/:id', {id: '@id'}, {
         *         'getFromHomeCategory' : {method: 'GET', params: {blogCategory: 'home'}}
         *      });
         *
         * In addition to these definitions, you can also create multi-dimensional objects.
         * They are nothing to do with the $resource object, it's just a more convenient
         * way that we have created for you to packing your related API urls together:
         *
         *      api.blog = {
         *                   list     : $resource('http://api.example.com/blog'),
         *                   getById  : $resource('http://api.example.com/blog/:id', {id: '@id'}),
         *                   getByDate: $resource('http://api.example.com/blog/:date', {id: '@date'}, {
         *                       get: {
         *                            method: 'GET',
         *                            params: {
         *                                getByDate: true
         *                            }
         *                       }
         *                   })
         *       }
         *
         * If you look at the last example from above, we overrode the 'get' method to put a
         * hardcoded parameter. Now every time we make the "getByDate" call, the {getByDate: true}
         * object will also be sent along with whatever data we are sending.
         *
         * All the above methods are using standard $resource service. You can learn more about
         * it at: https://docs.angularjs.org/api/ngResource/service/$resource
         *
         * -----
         *
         * After you defined your API urls, you can use them in Controllers, Services and even
         * in the UIRouter state definitions.
         *
         * If we use the last example from above, you can do an API call in your Controllers and
         * Services like this:
         *
         *      function MyController (api)
         *      {
         *          // Get the blog list
         *          api.blog.list.get({},
         *
         *              // Success
         *              function (response)
         *              {
         *                  console.log(response);
         *              },
         *
         *              // Error
         *              function (response)
         *              {
         *                  console.error(response);
         *              }
         *          );
         *
         *          // Get the blog with the id of 3
         *          var id = 3;
         *          api.blog.getById.get({'id': id},
         *
         *              // Success
         *              function (response)
         *              {
         *                  console.log(response);
         *              },
         *
         *              // Error
         *              function (response)
         *              {
         *                  console.error(response);
         *              }
         *          );
         *
         *          // Get the blog with the date by using custom defined method
         *          var date = 112314232132;
         *          api.blog.getByDate.get({'date': date},
         *
         *              // Success
         *              function (response)
         *              {
         *                  console.log(response);
         *              },
         *
         *              // Error
         *              function (response)
         *              {
         *                  console.error(response);
         *              }
         *          );
         *      }
         *
         * Because we are directly using $resource service, all your API calls will return a
         * $promise object.
         *
         * --
         *
         * If you want to do the same calls in your UI Router state definitions, you need to use
         * "apiResolver" service we have prepared for you:
         *
         *      $stateProvider.state('app.blog', {
         *          url      : '/blog',
         *          views    : {
         *               'content@app': {
         *                   templateUrl: 'app/main/apps/blog/blog.html',
         *                   controller : 'BlogController as vm'
         *               }
         *          },
         *          resolve  : {
         *              Blog: function (apiResolver)
         *              {
         *                  return apiResolver.resolve('blog.list@get');
         *              }
         *          }
         *      });
         *
         *  You can even use parameters with apiResolver service:
         *
         *      $stateProvider.state('app.blog.show', {
         *          url      : '/blog/:id',
         *          views    : {
         *               'content@app': {
         *                   templateUrl: 'app/main/apps/blog/blog.html',
         *                   controller : 'BlogController as vm'
         *               }
         *          },
         *          resolve  : {
         *              Blog: function (apiResolver, $stateParams)
         *              {
         *                  return apiResolver.resolve('blog.getById@get', {'id': $stateParams.id);
         *              }
         *          }
         *      });
         *
         *  And the "Blog" object will be available in your BlogController:
         *
         *      function BlogController(Blog)
         *      {
         *          var vm = this;
         *
         *          // Data
         *          vm.blog = Blog;
         *
         *          ...
         *      }
         */

        var api = {};

        // Base Url
        api.baseUrl = 'http://52.63.52.37:9000/api/';

        /**
         * Here you can find all the definitions that the Demo Project requires
         *
         * If you wish to use this method, you can create your API definitions
         * in a similar way.
         */

        /*
         api.dashboard = {
         project  : $resource(api.baseUrl + 'dashboard/project/data.json'),
         server   : $resource(api.baseUrl + 'dashboard/server/data.json'),
         analytics: $resource(api.baseUrl + 'dashboard/analytics/data.json')
         };

         api.cards = $resource(api.baseUrl + 'cards/cards.json');

         api.fileManager = {
         documents: $resource(api.baseUrl + 'file-manager/documents.json')
         };

         api.ganttChart = {
         tasks: $resource(api.baseUrl + 'gantt-chart/tasks.json'),
         timespans : $resource(api.baseUrl + 'gantt-chart/timespans.json')
         };

         api.icons = $resource('assets/icons/selection.json');

         api.invoice = $resource(api.baseUrl + 'invoice/invoice.json');

         api.mail = {
         inbox: $resource(api.baseUrl + 'mail/inbox.json')
         };

         api.profile = {
         timeline    : $resource(api.baseUrl + 'profile/timeline.json'),
         about       : $resource(api.baseUrl + 'profile/about.json'),
         photosVideos: $resource(api.baseUrl + 'profile/photos-videos.json')
         };

         api.quickPanel = {
         activities: $resource(api.baseUrl + 'quick-panel/activities.json'),
         contacts  : $resource(api.baseUrl + 'quick-panel/contacts.json'),
         events    : $resource(api.baseUrl + 'quick-panel/events.json'),
         notes     : $resource(api.baseUrl + 'quick-panel/notes.json')
         };

         api.search = {
         classic : $resource(api.baseUrl + 'search/classic.json'),
         mails   : $resource(api.baseUrl + 'search/mails.json'),
         users   : $resource(api.baseUrl + 'search/users.json'),
         contacts: $resource(api.baseUrl + 'search/contacts.json')
         };

         api.scrumboard = {
         boardList: $resource(api.baseUrl + 'scrumboard/boardList.json'),
         board    : $resource(api.baseUrl + 'scrumboard/boards/:id.json')
         };

         api.tables = {
         employees   : $resource(api.baseUrl + 'tables/employees.json'),
         employees100: $resource(api.baseUrl + 'tables/employees100.json')
         };

         api.timeline = {
         page1: $resource(api.baseUrl + 'timeline/page-1.json'),
         page2: $resource(api.baseUrl + 'timeline/page-2.json'),
         page3: $resource(api.baseUrl + 'timeline/page-3.json')
         };

         api.todo = {
         tasks: $resource(api.baseUrl + 'todo/tasks.json'),
         tags : $resource(api.baseUrl + 'todo/tags.json')
         };
         */

        return api;
    }

})();