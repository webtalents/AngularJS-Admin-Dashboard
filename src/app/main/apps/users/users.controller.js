(function ()
{
  'use strict';

  angular
    .module('app.users')
    .controller('UsersController', UsersController);

  /** @ngInject */
  function UsersController($scope, $rootScope, $mdSidenav, Users, msUtils, $mdDialog, $document, $http, GlobalVariable)
  {

    var vm = this;
    console.log(Users);
    // Data
    $scope.users = Users;
    //vm.user = User.data;
    vm.filterIds = null;
    vm.listType = 'all';
    vm.listOrder = 'username';
    vm.listOrderAsc = false;
    vm.selectedContacts = [];
    vm.newGroupName = '';
    /*$scope.error = $rootScope.errorUpdatePassword;
    $scope.errorMessage = $rootScope.errorUpdatePasswordMessage;
*/
    // Methods

    vm.toggleSelectContact = toggleSelectContact;
    vm.deselectContacts = deselectContacts;
    vm.deleteSelectedContacts = deleteSelectedContacts;
    vm.selectAllContacts = selectAllContacts;
    vm.exists = msUtils.exists;
    vm.addUser = addUser;
    vm.openContactDialog = openContactDialog;
    vm.deleteContactConfirm = deleteContactConfirm;

    //////////

    function openContactDialog($event, contact) {
      $mdDialog.show({
        controller: 'UserEditDialogController',
        controllerAs: 'vm',
        locals: {
          contact: contact
        },
        templateUrl: 'app/main/apps/users/dialogs/user-edit.html',
        clickOutsideToClose: true
      });

    }

    function addUser() {
      $mdDialog.show({
        controller: 'UserAddDialogController',
        controllerAs: 'vm',
        locals: {
          selectedMail: undefined
        },
        templateUrl: 'app/main/apps/users/dialogs/user-add.html',
        clickOutsideToClose: true
      });
    }

    function deleteContactConfirm(contact, ev) {
      //console.log(contact._id);
      $http({
          method: 'DELETE',
          url: GlobalVariable.serverUrl + 'api/users',
          params: {
            uid: contact._id
          }
      })
          // handle success
          .then(function success(response) {
              //$scope.users = response.data;
              updateUsersList();
          },
          function error(response) {
              console.log('error on getting users');
          });

    }


    /**
     * Toggle selected status of the contact
     *
     * @param contact
     * @param event
     */
    function toggleSelectContact(contact, event)
    {
      if ( event )
      {
        event.stopPropagation();
      }

      if ( vm.selectedContacts.indexOf(contact) > -1 )
      {
        vm.selectedContacts.splice(vm.selectedContacts.indexOf(contact), 1);
      }
      else
      {
        vm.selectedContacts.push(contact);
      }
    }

        /**
     * Delete Selected Contacts
     */
    function deleteSelectedContacts(ev)
    {
      var confirm = $mdDialog.confirm()
        .title('Are you sure want to delete the selected contacts?')
        .htmlContent('<b>' + vm.selectedContacts.length + ' selected</b>' + ' will be deleted.')
        .ariaLabel('delete users')
        .targetEvent(ev)
        .ok('OK')
        .cancel('CANCEL');

      $mdDialog.show(confirm).then(function ()
      {

        vm.selectedContacts.forEach(function (contact)
        {
          deleteContactConfirm(contact);
        });

        vm.selectedContacts = [];

      });

    }

    /**
     * Deselect contacts
     */
    function deselectContacts()
    {
      vm.selectedContacts = [];
    }

    /**
     * Sselect all contacts
     */
    function selectAllContacts()
    {
      vm.selectedContacts = $scope.filteredContacts;
    }

    function updateUsersList(event, args) {
      //console.log('update-event');

      // call api/users get api
      $http({
          method: 'GET',
          url: GlobalVariable.serverUrl + 'api/users'
      })
          // handle success
          .then(function success(response) {
              $scope.users = response.data;
          },
          function error(response) {
              console.log('error on getting users');
          });
    }

    // update users list
    $scope.$on('update-userslist', updateUsersList);

  }

})();