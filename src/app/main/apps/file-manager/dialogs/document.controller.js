(function ()
{
    'use strict';

    angular
        .module('app.file-manager')
        .controller('DocumentController', DocumentController);

    /** @ngInject */
    function DocumentController($rootScope, msApi, $scope, Categories, Files, apiAnswer, currentFolder) {
      var vm = this;

      vm.categories = Categories
      vm.formData = new FormData();
      vm.file = {};

      $scope.setFile = setFile;
      vm.hide = hide;
      vm.createCategory = createCategory;
      vm.createFile = createFile;

       //- -----------------------------------------


      function setFile(name, file) {
        vm.file[name] = file.files[0].name;
        vm.formData.append(name, file.files[0]);
       
        $scope.$apply();
      }


      function hide() {
        $mdDialog.hide();
      }

      function createCategory() {
        var place = $rootScope.currentPlace;
        var fdCategory = new FormData();
        
        for(var key in vm.category) {
          fdCategory.append(key, vm.category[key])
        }

        if(currentFolder && !vm.category.parent_category) {
          fdCategory.append('parent_category', currentFolder);
        }

        fdCategory.append('is_parent_portal', place.type);
        fdCategory.append('parent_id', place.id);
        
        msApi.request('fileManager.create.category@create', fdCategory, function (res) {
          apiAnswer.success()
          vm.category.parent_category || Categories.push(res)
        }, apiAnswer.fail)
      }

      function createFile() {
        var place = $rootScope.currentPlace;

        for(var key in vm.document) {
          vm.formData.append(key, vm.document[key])
        }

        if(currentFolder && !vm.document.category) {

          vm.formData.append('category', currentFolder);
        }

        vm.formData.append('is_parent_portal', place.type);
        vm.formData.append('parent_id', place.id);

        msApi.request('fileManager.create.file@create', vm.formData, function (res) {
          apiAnswer.success();

          vm.document.category || Files.push(res)
        }, apiAnswer.fail)
      }

      //-------------- Secondary -------------------

    }
})();
