(function() {

  'use strict';

  angular
    .module('uiDeniTreeview')
    .controller('uiDeniTreeviewController', uiDeniTreeviewController);

  uiDeniTreeviewController.$inject = ['$scope', 'uiDeniTreeviewService', 'uiDeniTreeviewConstant'];

  function uiDeniTreeviewController($scope, uiDeniTreeviewService, uiDeniTreeviewConstant) {
    this.rootItem = uiDeniTreeviewConstant.ROOT_ITEM;
  }

})();
