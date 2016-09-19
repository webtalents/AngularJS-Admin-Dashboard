(function ()
{
	'use strict';

	angular
		.module('app.core')
		.factory('apiAnswer', apiAnswer);

	/** @ngInject */
	function apiAnswer($mdToast, $mdDialog) {

		return {
			success: success,
			fail: fail
		}

		function success() {
			$mdToast.show(
        $mdToast.simple()
          .textContent('Done!')
          .position('top right')
          .hideDelay(3000)
      );

      $mdDialog.hide()
		}

		function fail() {
			$mdToast.show(
        $mdToast.simple()
          .textContent('Error!')
          .position('top right')
          .hideDelay(3000)
      );
		}
	}

})();