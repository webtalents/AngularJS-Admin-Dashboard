(function ()
{
	'use strict';

	angular
		.module('app.file-manager', [])
		.config(config);

	/** @ngInject */
	function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
	{
		// State
		$stateProvider.state('app.file-manager', {
			url      : '/file-manager',
			views    : {
				'content@app': {
					templateUrl: 'app/main/apps/file-manager/file-manager.html',
					controller : 'FileManagerController as vm'
				}
			},
			bodyClass: 'file-manager'
		});

		// Translation
		$translatePartialLoaderProvider.addPart('app/main/apps/file-manager');

		// Api

		msApiProvider.register('fileManager.create.category', ['http://52.63.52.37:9000/api/doc_category/create', {}, {
			create: {
				method: "POST",
				transformRequest: angular.identity,
				headers: { 'Content-Type': undefined }
			}
		}]);

		msApiProvider.register('fileManager.create.file', ['http://52.63.52.37:9000/api/documents/create', {}, {
			create: {
				method: "POST",
				transformRequest: angular.identity,
				headers: { 'Content-Type': undefined }
			}
		}]);

		msApiProvider.register('documents.files', ['http://52.63.52.37:9000/api/documents/:_id', null, {
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

		msApiProvider.register('documents.folders', ['http://52.63.52.37:9000/api/doc_category/:_id', null, {
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

		msApiProvider.register('fileManager.get.categories', ['http://52.63.52.37:9000/api/doc_category/:type/:id', {}, {
			get: {method: 'GET', isArray: true}
		}]);

		msApiProvider.register('fileManager.get.files', ['http://52.63.52.37:9000/api/documents/:type/:id', {}, {
			get: {method: 'GET', isArray: true}
		}]);

		msApiProvider.register('fileManager.category.get.files', ['http://52.63.52.37:9000/api/documents/category/:id', {}, {
			get: {method: 'GET', isArray: true}
		}]);

		msApiProvider.register('fileManager.category.get.categories', ['http://52.63.52.37:9000/api/doc_category/category/:id', {}, {
			get: {method: 'GET', isArray: true}
		}]);

		// Navigation
		msNavigationServiceProvider.saveItem('file-manager', {
			title : 'Documents',
			icon  : 'icon-folder',
			state : 'app.file-manager',
			weight: 1
		});
	}

})();