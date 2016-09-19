(function ()
{
    'use strict';

    angular
        .module('fuse')
        .factory('GlobalVariable', globalVariable);
        
    function globalVariable(){
    	return {
    		serverUrl: 'http://52.63.52.37:9000/'
    	};
    }
})();
