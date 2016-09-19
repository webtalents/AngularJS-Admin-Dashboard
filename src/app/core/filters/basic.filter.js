(function ()
{
	'use strict';

	angular
		.module('app.core')
		.filter('toTrusted', toTrustedFilter)
		.filter('htmlToPlaintext', htmlToPlainTextFilter)
		.filter('nospace', nospaceFilter)
		.filter('humanizeDoc', humanizeDocFilter)
		.filter('extname', extname)
		.filter('icon', icon);

	/** @ngInject */
	function toTrustedFilter($sce)
	{
		return function (value)
		{
			return $sce.trustAsHtml(value);
		};
	}

	/** @ngInject */
	function htmlToPlainTextFilter()
	{
		return function (text)
		{
			return String(text).replace(/<[^>]+>/gm, '');
		};
	}

	/** @ngInject */
	function nospaceFilter()
	{
		return function (value)
		{
			return (!value) ? '' : value.replace(/ /g, '');
		};
	}

	/** @ngInject */
	function humanizeDocFilter()
	{
		return function (doc)
		{
			if ( !doc )
			{
				return;
			}
			if ( doc.type === 'directive' )
			{
				return doc.name.replace(/([A-Z])/g, function ($1)
				{
					return '-' + $1.toLowerCase();
				});
			}
			return doc.label || doc.name;
		};
	}

	/** @ngInject */
	function extname() {
		return function(filename) {
			return filename.split('.').pop();
		}
	}

	/** @ngInject */
	function icon() {
		return function(filename) {
			var type = filename.split('.').pop();
			
			if(type.search(/png|jpg|gif|jpeg/) >= 0) {

				return 'icon-file-image';
			}
		}
	}

})();