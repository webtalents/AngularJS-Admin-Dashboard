(function () {
	'use strict';

	angular
		.module('app.file-manager')
		.controller('FileManagerController', FileManagerController);

	/** @ngInject */
	function FileManagerController($mdDialog, $rootScope, msApi, apiAnswer) {
		
		var vm = this;

		// Data
		vm.selectedAccount = 'creapond';
		vm.currentView = 'list';
		vm.showDetails = true;

		vm.path = [{
			title: '/',
			id: '/'
		}];

		vm.folders = [];
		vm.files = [];

		$rootScope.$watch(function() {
			return $rootScope.currentPlace
		}, function () {

			if(!$rootScope.currentPlace) return;
			
			loadCategories()
			loadFiles()
			
		});


		// Methods

		vm.select = select;
		vm.fileModal = fileModal;
		vm.openCategory = openCategory;
		vm.changePath = changePath;
		vm.update = update;
		vm.remove = remove;

		//////////

		function loadCategories() {

			msApi.request('fileManager.get.categories@get', {
				id: $rootScope.currentPlace.id,
				type: $rootScope.currentPlace.type
			}, function (res) {
				vm.folders = res;
				vm.selected = vm.folders[0];
			})

		}

		function loadFiles() {

			msApi.request('fileManager.get.files@get', {
				id: $rootScope.currentPlace.id,
				type: $rootScope.currentPlace.type
			}, function (res) {
				vm.files = res;
			})

		}


		function fileModal() {
		  $mdDialog.show({
				controller         : 'DocumentController',
				controllerAs       : 'vm',
				locals: {
					Categories: vm.folders,
					Files: vm.files,
					currentFolder: vm.currentFolder
				},
				templateUrl        : 'app/main/apps/file-manager/dialogs/document.html',
				clickOutsideToClose: true
			});
		}

		function openCategory(folder) {
			vm.path.push({
				id: folder._id,
				title: folder.name
			})

			vm.currentFolder = folder._id;

			loadOpenCategories(folder._id)
		}

		function changePath(id) {
			if(id === '/') {
				delete vm.currentFolder;
				loadCategories()
				loadFiles()

				return vm.path.splice(1);
			}

			vm.path.forEach(function (elem, i) {

				if(elem.id === id) {
					vm.path = vm.path.splice(0, i + 1)
				}

			}) 

			loadOpenCategories(id)
		}

		/**
		 * File added callback
		 * Triggers when files added to the uploader
		 *
		 * @param file
		 */
		
		function remove(element, key, type) {
 	
      msApi.request('documents.'+ type +'@remove', {_id: element._id}, function (res) {
        vm[type].splice(key, 1)
      })

    }

    function update(element, key, type) {
      $mdDialog.show({
        controller         : 'UpdateReportController',
        controllerAs       : 'vm',
        locals: {
          Files: vm.reports,
          Element: element,
          Templates: vm.templates,
          Categories: vm.categories
        },
        templateUrl        : 'app/main/apps/reports/dialogs/update.'+ type +'.html',
        clickOutsideToClose: true
      });
    }


		/**
		 * Select an item
		 *
		 * @param item
		 */
		function select(item) {
			vm.selected = item;
		}

		// ---------------- Secondary -------------------


		function loadOpenCategories(id) {

			msApi.request('fileManager.category.get.categories@get', {id: id}, function (res) {
				vm.folders = res;
			}, apiAnswer.fail)

			msApi.request('fileManager.category.get.files@get', {id: id}, function (res) {
				vm.files = res
			}, apiAnswer.fail)

		}
	}
})();