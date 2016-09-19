(function () {
	'use strict';

	angular
		.module('fuse')
		.controller('MainController', MainController);

	/** @ngInject */
	function MainController($scope, $rootScope, Portals, msApi) {

		var vm = this;

		vm.portals = Portals;

		vm.choosePortal = choosePortal;
		vm.chooseProperty = chooseProperty;

		portalByDefaoult();

		//---------------------------------------

		// Remove the splash screen

		$scope.$on('$viewContentAnimationEnded', function (event) {
			if ( event.targetScope.$id === $scope.$id ) {
				$rootScope.$broadcast('msSplashScreen::remove');
			}
		});

		function choosePortal(portal) {

			$rootScope.currentPlace = {
				type: 'portal',
				id: portal._id
			}

			// change interface (bg, color)
			changeInterface(portal)

			// load property and bind to scope;
			loadProperties(portal._id);

		}

		function chooseProperty(property) {
			
			$rootScope.currentPlace = {
				type: 'property',
				id: property._id
			}

			changeInterface(property)
		}

		//
		//------------- Secondary -------------
		//

		function portalByDefaoult () {
			if(!vm.portals[0]) return;

			$rootScope.currentPlace = {
				type: 'portal',
				id: Portals[0]._id
			};

			loadProperties(Portals[0]._id)
			changeInterface(Portals[0])

		}


		function loadProperties(id) {

			msApi.request('Properties@get', {
				id: id
			}, function (res) {
				vm.properties = res;
			})

		}

		function changeInterface(data) {
			vm.interface = data;
		}
	}

})();