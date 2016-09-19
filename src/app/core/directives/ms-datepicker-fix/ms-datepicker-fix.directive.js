(function ()
{
    'use strict';

    angular
        .module('app.core')
        .provider('msDatepickerFixConfig', msDatepickerFixConfigProvider)
        .directive('msDatepickerFix', msDatepickerFix);

    /** @ngInject */
    function msDatepickerFixConfigProvider()
    {

        // Default configuration
        var defaultConfiguration = {
            // To view
            formatter: function (val)
            {
                if ( !val )
                {
                    return '';
                }

                return val === '' ? val : new Date(val);
            },
            // To model
            parser   : function (val)
            {
                if ( !val )
                {
                    return '';
                }
                var offset = moment(val).utcOffset();
                var date = new Date(moment(val).add(offset, 'm'));
                return date;
            }
        };

        // Methods
        this.config = config;

        //////////

        /**
         * Extend default configuration with the given one
         *
         * @param configuration
         */
        function config(configuration)
        {
            defaultConfiguration = angular.extend({}, defaultConfiguration, configuration);
        }

        /**
         * Service
         */
        this.$get = function ()
        {
            return defaultConfiguration;
        };
    }

    /** @ngInject */
    function msDatepickerFix(msDatepickerFixConfig)
    {
        return {
            require: 'ngModel',
            link   : function (scope, elem, attrs, ngModel)
            {
                ngModel.$formatters.unshift(msDatepickerFixConfig.formatter); // to view
                ngModel.$parsers.unshift(msDatepickerFixConfig.parser); // to model
            }
        };
    }
})();