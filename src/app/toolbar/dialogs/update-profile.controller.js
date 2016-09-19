(function ()
{
    'use strict';

    angular
        .module('app.toolbar')
        .controller('ToolbarDialogController', ComposeDialogController);

    /** @ngInject */
    function ComposeDialogController($mdDialog, $scope, $cookies, $http, GlobalVariable)
    {
    	// Data
		var vm = this;

		vm.hide = hide;
		vm.updateProfile = updateProfile;

		var p_uid = $cookies.get('login_uid');
		console.log(p_uid);
		// Retrieve Current User Info
		$http({
		    method: 'GET',
		    url: GlobalVariable.serverUrl + 'api/users/' + p_uid,
		})
		    // handle success
		    .then(function success(response) {
		        console.log(response.data);
		        var contact = response.data;
		        vm.firstname = contact.username;
		        vm.lastname = contact.lastname;
		        vm.email = contact.email;
		        vm.phonenumber = contact.phonenumber;
		        vm.company = contact.company;
		        vm.jobtitle = contact.jobtitle;
		    },
		    function error(response) {
		        console.log('error on getting user profile');
		    });


		// Methods
		function hide() {
			$mdDialog.hide();
		}

		function updateProfile(){

			$http({
			    method: 'POST',
			    url: GlobalVariable.serverUrl + 'api/users/edit',
			    data: {
			        username: vm.firstname,
			        email: vm.email,
			        lastname: vm.lastname,
			        phonenumber: vm.phonenumber,
			        company: vm.company,
			        jobtitle: vm.jobtitle,
			        current_password: vm.currentpassword,
			        new_password: vm.newpassword,
			        uid: p_uid
			     }
			})
			    // handle success
			    .then(function success(response) {
			        //$scope.properties = response.data;
			        console.log(response);
			        //$rootScope.$broadcast('update-userslist');
			        hide();
			    },
			    function error(response) {
			        /*$scope.properties = {};*/
			        console.log(response);
			    });
		}

    }
})();