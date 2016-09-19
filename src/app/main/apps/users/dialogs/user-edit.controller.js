(function ()
{
    'use strict';

    angular
        .module('app.users')
        .controller('UserEditDialogController', UserEditDialogController);

    /** @ngInject */
    function UserEditDialogController($http, $scope, $rootScope, $mdDialog, GlobalVariable, contact)
    {
      // Data
      console.log(contact);
      var vm = this;

      vm.firstname = contact.username;
      vm.lastname = contact.lastname;
      vm.email = contact.email;
      vm.phonenumber = contact.phonenumber;
      vm.company = contact.company;
      vm.jobtitle = contact.jobtitle;
      //vm.selected_portals = contact.portals;
      // get selected portals



      /*vm.portal
      vm.jobtitle*/

      vm.hide = hide;
      vm.updateUser = updateUser;
      vm.resetPassword = resetPassword;

      $scope.portals_change = portals_change;


      // Retrieve Portals
      $http({
          method: 'GET',
          url: GlobalVariable.serverUrl + 'api/portal'
      })
          // handle success
          .then(function success(response) {
              //console.log(response.data);
              $scope.portals = response.data;
              var selected = [];
              for(var j = 0; j< $scope.portals.length; j++){
                for(var i = 0; i < contact.portals.length; i++) {
                  if($scope.portals[j]._id == contact.portals[i])
                    selected.push($scope.portals[j]);
                }
              }
              vm.selected_portals = selected;
              portals_change();

          },
          function error(response) {
              console.log('error on getting portals');
          });

      // Method
      function portals_change() {
          /*console.log($scope.user.selected_portals);*/


          // Retrieve properties based on portal 
          $http({
              method: 'POST',
              url: GlobalVariable.serverUrl + 'api/property/multiple',
              data: {
                  portals_data: vm.selected_portals
               }
          })
              // handle success
              .then(function success(response) {
                  $scope.properties = response.data;
                  var selected = [];
                  for(var j = 0; j< $scope.properties.length; j++){
                    for(var i = 0; i < contact.properties.length; i++) {
                      if($scope.properties[j]._id == contact.properties[i])
                        selected.push($scope.properties[j]);
                    }
                  }
                  vm.selected_properties = selected;
              },
              function error(response) {
                  $scope.properties = {};
              });
      }


      function hide() {
        $mdDialog.hide();
      }

      function updateUser() {

        var p_portals = [];
        var p_properties = [];
        console.log(vm.selected_portals);
        for(var i = 0; i < Object.keys(vm.selected_portals).length; i++){
          p_portals.push(vm.selected_portals[i]._id);
        }
        
        for(var i = 0; i < Object.keys(vm.selected_properties).length; i++){
          p_properties.push(vm.selected_properties[i]._id);
        }
        //console.log(p_portals);

        $http({
            method: 'POST',
            url: GlobalVariable.serverUrl + 'api/users/edit',
            data: {
                portals: p_portals,
                properties: p_properties,
                username: vm.firstname,
                email: vm.email,
                lastname: vm.lastname,
                phonenumber: vm.phonenumber,
                company: vm.company,
                jobtitle: vm.jobtitle,
                uid: contact._id
             }
        })
            // handle success
            .then(function success(response) {
                //$scope.properties = response.data;
                console.log(response);
                $rootScope.$broadcast('update-userslist');
                hide();
            },
            function error(response) {
                /*$scope.properties = {};*/
                console.log(response);
            });
      }

      function resetPassword() {
        

        $mdDialog.show({
          controller: 'UserResetPasswordController',
          controllerAs: 'vm',
          locals: {
            contact: contact
          },
          templateUrl: 'app/main/apps/users/dialogs/user-resetpassword.html',
          clickOutsideToClose: true
        });
      }

    }
})();
