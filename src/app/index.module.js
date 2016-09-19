(function ()
{
    'use strict';

    /**
     * Main module of the Fuse
     */
    angular
        .module('fuse', [

            // Core
            'app.core',

            // Navigation
            'app.navigation',

            // Toolbar
            'app.toolbar',

            // Quick panel
            'app.quick-panel',

            // Apps
            //'app.dashboards',
            'app.file-manager',
            'app.reports',
            'app.contacts',
            'app.auth.login',
            'app.auth.forgot-password',
            'app.auth.reset-password',
            //'app.calendar',
            //'app.e-commerce',
            //'app.mail',
            //'app.chat',
            //'app.scrumboard',
            //'app.gantt-chart',
            //'app.todo',
            'app.users',
            //'app.notes',

            // Pages

            // User Interface
            //'app.ui',

            // Components
            //'app.components'
        ]);
})();
