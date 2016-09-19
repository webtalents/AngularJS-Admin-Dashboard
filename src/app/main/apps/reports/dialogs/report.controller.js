(function ()
{
    'use strict';

    angular
        .module('app.toolbar')
        .controller('ReportDialogController', ReportDialogController);

    /** @ngInject */
    function ReportDialogController($rootScope, msApi, $mdDialog, Properties, ReportId, SweetAlert) {
      var vm = this;

      vm.hide = hide;
      vm.properties = Properties;

      vm.changeProperties = changeProperties;
      vm.addProperty = addProperty;
      vm.save = save;
      vm.reset = reset;
      vm.close = close;
      vm.remove = remove;

      //- -----------------------------------------

      function save() {
        vm.propertiesCopy = angular.copy(vm.properties)

        var obj = { properties: vm.properties, _id: ReportId};

        msApi.request('reports.reports@update', obj, function (res) {
          SweetAlert.swal("Good job!", "", "success");
        });
      }

      function remove(id) {
        vm.properties.splice(id, 1)
      }

      function changeProperties() {
        vm.propertiesChanging = true;

        vm.propertiesCopy = angular.copy(vm.properties)
      }

      function reset() {
        vm.properties = angular.copy(vm.propertiesCopy)
      }

      function close() {
        vm.reset();
        vm.propertiesChanging = false;
      }

      function addProperty() {
        vm.properties.push('')
      }

      function hide() {
        $mdDialog.hide();
      }
    }
})();
