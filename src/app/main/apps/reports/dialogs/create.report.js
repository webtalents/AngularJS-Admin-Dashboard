(function ()
{
    'use strict';

    angular
        .module('app.toolbar')
        .controller('CreateReportController', ComposeDialogController);

    /** @ngInject */
    function ComposeDialogController($rootScope, msApi, Categories, Files, apiAnswer, currentFolder, Templates) {
      var vm = this;

      vm.categories = Categories;
      vm.templates = Templates;
      vm.fdCategory = new FormData()
      vm.fdReport = new FormData()

      vm.hide = hide;
      vm.createReport = createReport;
      vm.createCategory = createCategory;
      vm.templateChange = templateChange;

       //- -----------------------------------------


      function createReport() {
        var place = $rootScope.currentPlace;

        for(var key in vm.report) {
          vm.fdReport.append(key, vm.report[key])
        }


        if(currentFolder && !vm.report.parent_category) {
          vm.fdReport.append('parent_category', currentFolder);
        }

        vm.fdReport.append('parent', place.type);
        vm.fdReport.append('id', place.id);

        msApi.request('reports.reports@create', vm.fdReport, function (res) {
          apiAnswer.success();

          vm.report.parent_category || Files.push(res)
        }, apiAnswer.fail)
      }

      function createCategory() {
        var place = $rootScope.currentPlace;

        for(var key in vm.category) {
          vm.fdCategory.append(key, vm.category[key])
        }

        if(currentFolder && !vm.category.parent_category) {
          vm.fdCategory.append('parent_category', currentFolder);
        }

        vm.fdCategory.append('parent', place.type);
        vm.fdCategory.append('id', place.id);

        msApi.request('reports.categories@create', vm.fdCategory, function (res) {
          apiAnswer.success();

          vm.category.parent_category || Categories.push(res)
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
