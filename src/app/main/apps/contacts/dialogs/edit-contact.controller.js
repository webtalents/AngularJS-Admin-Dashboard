(function ()
{
    'use strict';

    angular
        .module('app.contacts')
        .controller('ContactsEditController', ContactsEditController);

    /** @ngInject */
    function ContactsEditController($mdDialog, contentToEdit, saveContact)
    {

      var vm = this;

      vm.hide = hide;

      vm.toolbar = [
        ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'pre', 'quote', 'justifyLeft', 'justifyCenter', 'justifyRight', 'indent', 'outdent'],
        ['bold', 'italics', 'underline', 'strikeThrough', 'ul', 'ol', 'redo', 'undo', 'clear'],
        ['html', 'insertImage','insertLink', 'insertVideo', 'wordcount', 'charcount']
      ];

      vm.text = contentToEdit;

      vm.save = save;

       //- -----------------------------------------


      function save() {
        saveContact(vm.text)
      }

      function hide() {
        $mdDialog.hide();
      }
    }
})();
