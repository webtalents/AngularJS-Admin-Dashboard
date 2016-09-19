(function ()
{
    'use strict';

    angular
        .module('app.toolbar')
        .controller('ToolbarDialogPortalController', ComposeDialogController);

    /** @ngInject */
    function ComposeDialogController($scope, msApi, apiAnswer) {
      var vm = this;

      vm.file = {};

      $scope.setFile = setFile;
      vm.create = create;
      vm.clean = clean;
      vm.formData = new FormData();

       //- -----------------------------------------

      function setFile(name, file) {
        vm.file[name] = file.files[0].name;
        vm.formData.append(name, file.files[0]);
       
        $scope.$apply();
      }

      function create() {

        vm.upload = true;

        if(vm.color.bgColorValue) {
          vm.form.color = vm.color.bgColorValue;
        }

        for(var key in vm.form) {
          vm.formData.append(key, vm.form[key])
        }

        msApi.request('Portal@create', vm.formData, function (res) {
          apiAnswer.success()
        }, apiAnswer.fail)
      }

      function clean() {
        vm.form = {};
        vm.file = {};
        vm.color = {};
        vm.formData = new FormData();
      }
    }
})();
