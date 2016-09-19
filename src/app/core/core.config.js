(function ()
{
    'use strict';

    angular
        .module('app.core')
        .config(config);

    /** @ngInject */
    function config($ariaProvider, $logProvider, msScrollConfigProvider, uiGmapGoogleMapApiProvider, $translateProvider, $provide, fuseConfigProvider)
    {
        // Enable debug logging
        $logProvider.debugEnabled(true);
        
        // uiGmapgoogle-maps configuration
        uiGmapGoogleMapApiProvider.configure({
            //    key: 'your api key',
            v        : '3.exp',
            libraries: 'weather,geometry,visualization'
        });

        // angular-translate configuration
        $translateProvider.useLoader('$translatePartialLoader', {
            urlTemplate: '{part}/i18n/{lang}.json'
        });
        $translateProvider.preferredLanguage('en');
        $translateProvider.useSanitizeValueStrategy('sanitize');

        // Text Angular options
        $provide.decorator('taOptions', [
            '$delegate', function (taOptions)
            {
                taOptions.toolbar = [
                    ['bold', 'italics', 'underline', 'ul', 'ol', 'quote']
                ];

                taOptions.classes = {
                    focussed           : 'focussed',
                    toolbar            : 'ta-toolbar',
                    toolbarGroup       : 'ta-group',
                    toolbarButton      : 'md-button',
                    toolbarButtonActive: 'active',
                    disabled           : '',
                    textEditor         : 'form-control',
                    htmlEditor         : 'form-control'
                };

                return taOptions;
            }
        ]);

        // Text Angular tools
        $provide.decorator('taTools', [
            '$delegate', function (taTools)
            {
                taTools.quote.iconclass = 'icon-format-quote';
                taTools.bold.iconclass = 'icon-format-bold';
                taTools.italics.iconclass = 'icon-format-italic';
                taTools.underline.iconclass = 'icon-format-underline';
                taTools.strikeThrough.iconclass = 'icon-format-strikethrough';
                taTools.ul.iconclass = 'icon-format-list-bulleted';
                taTools.ol.iconclass = 'icon-format-list-numbers';
                taTools.redo.iconclass = 'icon-redo';
                taTools.undo.iconclass = 'icon-undo';
                taTools.clear.iconclass = 'icon-close-circle-outline';
                taTools.justifyLeft.iconclass = 'icon-format-align-left';
                taTools.justifyCenter.iconclass = 'icon-format-align-center';
                taTools.justifyRight.iconclass = 'icon-format-align-right';
                taTools.justifyFull.iconclass = 'icon-format-align-justify';
                taTools.indent.iconclass = 'icon-format-indent-increase';
                taTools.outdent.iconclass = 'icon-format-indent-decrease';
                taTools.html.iconclass = 'icon-code-tags';
                taTools.insertImage.iconclass = 'icon-file-image-box';
                taTools.insertLink.iconclass = 'icon-link';
                taTools.insertVideo.iconclass = 'icon-filmstrip';

                return taTools;
            }
        ]);

        /*eslint-disable */

        // ng-aria configuration
        $ariaProvider.config({
            tabindex: false
        });

        // Fuse theme configurations
        fuseConfigProvider.config({
            'disableCustomScrollbars'        : false,
            'disableCustomScrollbarsOnMobile': true,
            'disableMdInkRippleOnMobile'     : true
        });

        // msScroll configuration
        msScrollConfigProvider.config({
            wheelPropagation: true
        });

        /*eslint-enable */
    }
})();