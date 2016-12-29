(function() {

  'use strict'

  angular
    .module('exampleApp',
      ['uiDeniTreeview']
    )
    .controller('exampleController', exampleController);

  exampleController.$inject = ['$scope', '$timeout'];

  function exampleController($scope) {

    //select the first item when the records are loaded
    $scope.$on('onload', function (event, data) {
      var treeview = angular.element('.myTreeview');
      treeview.api.selectItem(2);
    });

  };

})();
