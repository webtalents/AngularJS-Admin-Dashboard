(function ()
{
    'use strict';

    angular
        .module('app.reports')
        .controller('ReportsController', ReportsController);

    /** @ngInject */
   function ReportsController($mdDialog, $rootScope, msApi, apiAnswer) {
    
    var vm = this;

    // Data
    vm.selectedAccount = 'creapond';
    vm.currentView = 'list';
    vm.showDetails = true;

    vm.path = [{
      title: '/',
      id: '/'
    }];

    vm.categories = [];
    vm.reports = [];

    $rootScope.$watch(function() {
      return $rootScope.currentPlace
    }, function () {

      if(!$rootScope.currentPlace) return;
      
      loadCategories()
      loadFiles()
      
    });

    vm.templates = [
      { name: "White Collar", temp: 'white-collar.html', id: 0, dropdown: true },
      { name: "Blue Collar", temp: 'white-collar.html', id: 1, dropdown: true },
      { name: "AD&D", temp: 'ad-and-d.html', id: 2,  dropdown: true },
      { name: "TCN Expat", temp: 'tcn-expat.html', id: 3,  dropdown: true },
      { name: "TCN Offshore", temp: 'tcn-offshore.html', id: 4,  dropdown: true },
      { name: "Minot Project Notification", temp: 'minor-project-notification.html', id: 5},
      { name: "War & Terror Cover Request", temp: 'request-war-terror-cover.html', id: 6},
    ]


    // Methods
    // 
    vm.select = select;
    vm.reportModal = reportModal;
    vm.openCategory = openCategory;
    vm.changePath = changePath;
    vm.reportInfoModal = reportInfoModal;
    vm.remove = remove;
    vm.update = update;

    //////////

    function reportModal() {
      $mdDialog.show({
        controller         : 'CreateReportController',
        controllerAs       : 'vm',
        locals: {
          Categories: vm.categories,
          Files: vm.reports,
          currentFolder: vm.currentFolder,
          Templates: vm.templates
        },
        templateUrl        : 'app/main/apps/reports/dialogs/report.html',
        clickOutsideToClose: true
      });
    }

    function reportInfoModal(report) {

      var template = vm.templates[report.template].temp;

      $mdDialog.show({
        controller         : 'ReportDialogController',
        controllerAs       : 'vm',
        locals: {
          Properties: report.properties,
          ReportId: report._id
        },
        templateUrl        : 'app/main/apps/reports/dialogs/templates/' + template,
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

    function remove(element, key, type) {
 
      msApi.request('reports.'+ type +'@remove', {_id: element._id}, function (res) {
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

    function loadCategories() {

      msApi.request('reports.get.categories@get', {
        id: $rootScope.currentPlace.id,
        type: $rootScope.currentPlace.type
      }, function (res) {
        vm.categories = res;
        vm.selected = vm.categories[0];
      })

    }

    function loadFiles() {

      msApi.request('reports.get.files@get', {
        id: $rootScope.currentPlace.id,
        type: $rootScope.currentPlace.type
      }, function (res) {
        vm.reports = res;
      })

    }


    function loadOpenCategories(id) {

      msApi.request('reports.category.get.categories@get', {id: id}, function (res) {
        vm.categories = res;
      }, apiAnswer.fail)

      msApi.request('reports.category.get.files@get', {id: id}, function (res) {
        vm.reports = res
      }, apiAnswer.fail)

    }
  }
})();