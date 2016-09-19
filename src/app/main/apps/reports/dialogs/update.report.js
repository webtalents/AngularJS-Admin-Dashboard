(function ()
{
    'use strict';

    angular
        .module('app.toolbar')
        .controller('UpdateReportController', UpdateReportController);

    /** @ngInject */
    function UpdateReportController($rootScope, msApi, Element, apiAnswer, Templates, Categories, Files) {
      var vm = this;

      vm.fdCategory = new FormData()
      vm.fdReport = new FormData()

      vm.categories = Categories;
      vm.templates = Templates;
      vm.element = Element;
      vm.parent = Element.parent_category;

      vm.hide = hide;
      vm.updateReport = updateReport;
      vm.createCategory = createCategory;
      vm.templateChange = templateChange;

       //- -----------------------------------------


      function updateReport() {

        msApi.request('reports.reports@update', vm.element, function (res) {
          apiAnswer.success();

          if(vm.element.parent_category) {
            Files.forEach(function (elem, i) {
              elem.parent_category !== vm.parent ? 
                Files.splice(i, 1): null
            })
          }
        }, apiAnswer.fail)
      }

      function createCategory() {
        
        msApi.request('reports.categories@update', vm.element, function (res) {
          apiAnswer.success();

          if(vm.element.parent_category){
            Categories.forEach(function (elem, i) {
              elem.parent_category !== vm.parent ? 
                Categories.splice(i, 1): null
            })
          }

        }, apiAnswer.fail)
      }


      function templateChange() {
        vm.report.properties = []
      }

      function hide() {
        $mdDialog.hide();
      }
    }
})();
