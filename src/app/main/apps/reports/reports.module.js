(function ()
{
	'use strict';

	angular
		.module('app.reports', [])
		.config(config);

	/** @ngInject */
	function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
	{
		// State
		$stateProvider.state('app.reports', {
			url      : '/reports',
			views    : {
				'content@app': {
					templateUrl: 'app/main/apps/reports/reports.html',
					controller : 'ReportsController as vm'
				}
			},
			bodyClass: 'reports'
		});

		// Translation
		$translatePartialLoaderProvider.addPart('app/main/apps/reports');

		// Api
		// 


		msApiProvider.register('reports.categories', ['http://52.63.52.37:9000/api/report_category/:_id', null, {
			remove: { method: 'DELETE'},
			update: { 
				method: 'PUT', 
				params: {
          _id: "@_id"
        } 
      },
      create: {
      	method: 'POST', 
      	transformRequest: angular.identity,
				headers: { 'Content-Type': undefined }
      }
		}]);

		msApiProvider.register('reports.reports', ['http://52.63.52.37:9000/api/reports/:_id', null, {
			remove: { method: 'DELETE'},
			update: { 
				method: 'PUT', 
				params: {
          _id: "@_id"
        } 
      },
      create: {
      	method: 'POST', 
      	transformRequest: angular.identity,
				headers: { 'Content-Type': undefined }
      }
		}]);


		msApiProvider.register('reports.get.categories', ['http://52.63.52.37:9000/api/report_category/:type/:id', {}, {
			get: {method: 'GET', isArray: true}
		}]);
		
		msApiProvider.register('reports.get.files', ['http://52.63.52.37:9000/api/reports/:type/:id', {}, {
			get: {method: 'GET', isArray: true}
		}]);

		msApiProvider.register('reports.category.get.files', ['http://52.63.52.37:9000/api/reports/category/:id', {}, {
			get: {method: 'GET', isArray: true}
		}]);

		msApiProvider.register('reports.category.get.categories', ['http://52.63.52.37:9000/api/report_category/category/:id', {}, {
			get: {method: 'GET', isArray: true}
		}]);

		// Navigation
		msNavigationServiceProvider.saveItem('reports', {
			title : 'Reports',
			icon  : 'icon-calendar-today',
			state : 'app.reports',
			weight: 1
		});
	}

})();