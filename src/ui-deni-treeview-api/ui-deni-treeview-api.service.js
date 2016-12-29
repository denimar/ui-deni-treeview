(function() {

  'use strict';

  angular
    .module('uiDeniTreeview')
    .service('uiDeniTreeviewApiService', uiDeniTreeviewApiService);

  function uiDeniTreeviewApiService() {

    let vm = this;

    //
    function _getApi(scope, uiDeniTreeviewService) {

      return {

        //
        checkAll: function() {
          return uiDeniTreeviewService.checkAll(scope);
        },

        //
        // itemToCheck can be passed as a "id" or as a "object" ex:
        //
        //  treeviewEl.api.checkItem(357) //357 is a id value or
        //  treeviewEl.api.checkItem({name: 'Dog'}) //it will searches for the first item that match the passed data and leaf is true
        //
        checkItem: function(itemToCheck) {
          return uiDeniTreeviewService.checkItem(scope, itemToCheck);
        },

        //
        // folderToFind can be passed as a "id" or as a "object" ex:
        //
        //  treeviewEl.api.findFolder(456) //456 is a id value or
        //  treeviewEl.api.findFolder({name: 'Brazil'}) //it will searches for the first folder that match the passed data and leaf is not true
        //
        findFolder: function(folderToFind) {
          return uiDeniTreeviewService.findFolder(scope, folderToFind);
        },

        //
        // itemToFind can be passed as a "id" or as a "object" ex:
        //
        //  treeviewEl.api.findItem(357) //357 is a id value or
        //  treeviewEl.api.findItem({name: 'Dog'}) //it will searches for the first item that match the passed data and leaf is true
        //
        findItem: function(itemToFind) {
          return uiDeniTreeviewService.findItem(scope, itemToFind);
        },

        //
        getCheckedIds: function() {
          return uiDeniTreeviewService.getCheckedIds(scope);
        },

        //
        getCheckedItems: function() {
          return uiDeniTreeviewService.getCheckedItems(scope);
        },

        //
        getSelectedItem: function() {
          return uiDeniTreeviewService.getSelectedItem(scope);
        },

        //
        invertAllChecks: function() {
          return uiDeniTreeviewService.invertAllChecks(scope);
        },

        //
        // itemToInvert can be passed as a "id" or as a "object" ex:
        //
        //  treeviewEl.api.invertCheckItem(357) //357 is a id value or
        //  treeviewEl.api.invertCheckItem({name: 'Dog'}) //it will searches for the first item that match the passed data and leaf is true
        //
        invertCheckItem: function(itemToInvert) {
          return uiDeniTreeviewService.invertCheckItem(scope, itemToInvert);
        },


        //
        // item is a optional param that when it is set load will return just the children items.
        //
        load: function(item) {
          return uiDeniTreeviewService.load(scope, item);
        },

        //
        // item is a optional param that when it is set load will return just the children items.
        //
        loadData: function(data, item) {
          return uiDeniTreeviewService.loadData(scope, data, item);
        },

        //
        reload: function() {
          return uiDeniTreeviewService.reload(scope);
        },

        //
        uncheckAll: function() {
          return uiDeniTreeviewService.uncheckAll(scope);
        },

        //
        // folderToFind can be passed as a "id" or as a "object" ex:
        //
        //  treeviewEl.api.selectFolder(456) //456 is a id value or
        //  treeviewEl.api.selectFolder({name: 'Brazil'}) //it will searches for the first folder that match the passed data and leaf is not true
        //
        selectFolder: function(folderToFind) {
          uiDeniTreeviewService.selectFolder(scope, folderToFind);
        },

        //
        // itemToFind can be passed as a "id" or as a "object" ex:
        //
        //  treeviewEl.api.selectItem(357) //357 is a id value or
        //  treeviewEl.api.selectItem({name: 'Dog'}) //it will searches for the first item that match the passed data and leaf is true
        //
        selectItem: function(itemToFind) {
          uiDeniTreeviewService.selectItem(scope, itemToFind);
        },

        //
        // itemToUncheck can be passed as a "id" or as a "object" ex:
        //
        //  treeviewEl.api.uncheckItem(357) //357 is a id value or
        //  treeviewEl.api.uncheckItem({name: 'Dog'}) //it will searches for the first item that match the passed data and leaf is true
        //
        uncheckItem: function(itemToUncheck) {
          return uiDeniTreeviewService.uncheckItem(scope, itemToUncheck);
        },
      };

    }

    //
    vm.implementApi = function(scope, element, uiDeniTreeviewService) {

      element.each(function() {
          angular.element(this).init.prototype.api = _getApi(scope, uiDeniTreeviewService);
      });

    };

  }

})();
