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
        getCheckedItems: function() {
          return uiDeniTreeviewService.getCheckedItems(scope);
        },

        //
        getSelectedItem: function() {
          return uiDeniTreeviewService.getSelectedItem(scope);
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
