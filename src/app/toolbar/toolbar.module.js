(function ()
{
	'use strict';

	angular
		.module('app.toolbar', [])
		.config(config);

	/** @ngInject */
	function config($translatePartialLoaderProvider, msApiProvider)
	{
		$translatePartialLoaderProvider.addPart('app/toolbar');
		
		msApiProvider.register('Property', ['http://localhost:9000/api/property/create', {}, {
		  create: {
				method: "POST",
				transformRequest: angular.identity,
				headers: { 'Content-Type': undefined }
			}
		}]);

		msApiProvider.register('Portal', ['http://localhost:9000/api/portal/create', {}, {
		  create: {
				method: "POST",
				transformRequest: angular.identity,
				headers: { 'Content-Type': undefined }
			}
		}]);

	}
})();
