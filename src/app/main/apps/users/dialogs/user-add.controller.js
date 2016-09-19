(function ()
{
    'use strict';

    angular
        .module('app.users')
        .controller('UserAddDialogController', UserAddDialogController);

    /** @ngInject */
    function UserAddDialogController($http, $scope, $rootScope, $mdDialog, GlobalVariable)
    {
      // Data
      var vm = this;

      vm.hide = hide;
      vm.addUser = addUser;
      $scope.portals_change = portals_change;


      // Retrieve Portals
      $http({
          method: 'GET',
          url: GlobalVariable.serverUrl + 'api/portal'
      })
          // handle success
          .then(function success(response) {
              console.log(response.data);
              $scope.portals = response.data;
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
                  portals_data: $scope.user.selected_portals
               }
          })
              // handle success
              .then(function success(response) {
                  $scope.properties = response.data;
              },
              function error(response) {
                  $scope.properties = {};
              });
      }


      function hide() {
        $mdDialog.hide();
      }

      function addUser() {
        
        //$scope.user.selected_properties;
        //$scope.user.selected_portals;
        var p_portals = [];
        var p_properties = [];
        for(var i = 0; i < Object.keys($scope.user.selected_portals).length; i++){
          p_portals.push($scope.user.selected_portals[i]._id);
        }
        
        for(var i = 0; i < Object.keys($scope.user.selected_properties).length; i++){
          p_properties.push($scope.user.selected_properties[i]._id);
        }

        $http({
            method: 'POST',
            url: GlobalVariable.serverUrl + 'auth/register',
            data: {
                portals: p_portals,
                properties: p_properties,
                username: $scope.user.firstname,
                email: $scope.user.email,
                lastname: $scope.user.lastname,
                phonenumber: $scope.user.phonenumber,
                company: $scope.user.company,
                jobtitle: $scope.user.jobtitle

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
                $rootScope.$broadcast('update-userslist');
                hide();
            });
      }
    }
})();
