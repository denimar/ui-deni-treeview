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
        }

      };

    };

    //
    vm.implementApi = function(scope, element, uiDeniTreeviewService) {

      element.each(function() {
          angular.element(this).init.prototype.api = _getApi(scope, uiDeniTreeviewService);
      });


    };

  }

})();
