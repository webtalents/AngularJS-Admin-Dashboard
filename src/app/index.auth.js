(function ()
{
    'use strict';

    angular
        .module('fuse')
        .factory('AuthService', authService);

    /** @ngInject */
    //authService.$inject = ['$q', '$timeout', '$http',  'GlobalVariable']

    function authService($q, $timeout, $cookies, $http, GlobalVariable)
    {
      
      $http.defaults.useXDomain = true;
        // create user variable
        var user = null;

        // return available functions for use in the controllers
        return ({
            isLoggedIn: isLoggedIn,
            getUserStatus: getUserStatus,
            login: login,
            logout: logout,
            register: register,
            forgot: forgot,
            reset_validate: reset_validate,
            reset_password: reset_password
        });

        function isLoggedIn() {
          console.log('is logged in: ' + user);
          if (user) {
            return true;
          } else {
            return false;
          }
        }

        function getUserStatus() {

            //return $http.get('http://52.63.52.37:9000/auth/status')
            return $http({
               method: 'GET',
               url: GlobalVariable.serverUrl + 'auth/status',
               withCredentials: true
            })
            // handle success
            .success(function(data) {
              console.log('get user status: ' + data);
               //console.log('success');
               //console.log(data);
               if(data.status) {
                  user = true;
               } else {
                  user = false;
               }
            })
            // handle error
            .error(function(data) {
               //console.log("error");
               console.log('authservice error');
               user = false;
            });
        }

        function login(email, password, remember_me) {
            // create a new instance of deferred            
            var deferred = $q.defer();

            // send a post request to the server
            return $http({
               method: 'POST',
               url: GlobalVariable.serverUrl + 'auth/login',
               params: {
                  email: email,
                  password: password,
                  remember_me: remember_me
               },
               withCredentials: true
            })
               // handle success
               .then(function success(response) {
                //console.log(response);

                  if(response.status === 200 && response.data.success){
                     user = true;
                     console.log('login: ' + user);
                     $cookies.put('login_uid', response.data.uid);
                     //console.log(response.data.uid);
                     //console.log('ss');
                     deferred.resolve();

                  } else {
                     user = false;
                     deferred.reject();
                  }
               },
                function error(response){
                  user = false;
                  console.log('error');
                  deferred.reject();   
                });
               // handle error
               /*.error(function (data) {
                  
               });*/
            // return promise object
            return deferred.promise;
        }

        function logout() {
            // create a new instance of deferred
            var deferred = $q.defer();

            return $http({
               method: 'GET',
               url: GlobalVariable.serverUrl + 'auth/logout',
               withCredentials: true
            })
               // handle success
               .then(function success(response) {
                  user = false;
                  deferred.resolve();
               },
                function error(response){
                  user = false;
                  deferred.reject();
                });

            // return promise object
            return deferred.promise;

        }

        function forgot(email, callback) {

            $http({
                method: 'POST',
                url: GlobalVariable.serverUrl + 'auth/forgot',
                params: {
                  email: email
               },
                withCredentials: true
            })
                // handle success
                .then(function success(response) {
                    //console.log(response.data);
                    callback(response);
                },
                function error(response) {
                    callback(response);
                });

        }

        function reset_validate(token, callback) {

            $http({
                method: 'GET',
                url: GlobalVariable.serverUrl + 'auth/reset/' + token,
                withCredentials: true
            })
                // handle success
                .then(function success(response) {
                    //console.log(response.data);
                    callback(response);
                },
                function error(response) {
                    callback(response);
                });

        }

        function reset_password(token, password, callback) {

            $http({
                method: 'POST',
                url: GlobalVariable.serverUrl + 'auth/reset/' + token,
                data: {
                  password: password
                },
                withCredentials: true
            })
                // handle success
                .then(function success(response) {
                    //console.log(response.data);
                    callback(response);
                },
                function error(response) {
                    callback(response);
                });

        }

        function register(email, password) {
            // create a new instance of deferred
            var deferred = $q.defer();

            // send a post request to the server
            $http.post('/user/register', 
               {email: email, password: password})
               // handle success
               .success(function(data, status) {
                  if(status === 200 && data.status) {
                     deferred.resolve();
                  } else {
                     deferred.reject();
                  }
               })
               // handle error
               .error(function (data) {
                  deferred.reject();
               });

            // return promise object
            return deferred.promise;
        }
    }

})();